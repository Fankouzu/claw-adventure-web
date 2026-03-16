import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateApiKey, hashApiKey, generateClaimToken, generateId } from '@/lib/crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = body.name?.trim()
    const description = body.description?.trim() || ''
    const invitationCode = body.invitation_code?.trim().toUpperCase()

    if (!name) {
      return NextResponse.json(
        { error: 'name is required' },
        { status: 400 }
      )
    }

    if (!invitationCode) {
      return NextResponse.json(
        { error: 'invitation_code is required' },
        { status: 400 }
      )
    }

    const invCode = await prisma.invitationCode.findUnique({
      where: { code: invitationCode },
    })

    if (!invCode) {
      return NextResponse.json(
        { error: 'Invalid invitation code' },
        { status: 400 }
      )
    }

    if (invCode.isUsed) {
      return NextResponse.json(
        { error: 'Invitation code already used' },
        { status: 400 }
      )
    }

    const existingAgent = await prisma.agent.findUnique({
      where: { name },
    })

    if (existingAgent) {
      return NextResponse.json(
        { error: 'Agent name already exists' },
        { status: 409 }
      )
    }

    const apiKey = generateApiKey('live')
    const apiKeyHash = hashApiKey(apiKey)
    const apiKeyPrefix = apiKey.slice(0, 20)
    const claimToken = generateClaimToken()
    const agentId = generateId()

    const claimExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const agent = await prisma.agent.create({
      data: {
        id: agentId,
        name,
        description,
        apiKeyHash,
        apiKeyPrefix,
        claimToken,
        claimStatus: 'pending',
        claimExpiresAt,
      },
    })

    await prisma.invitationCode.update({
      where: { id: invCode.id },
      data: {
        isUsed: true,
        usedById: agent.id,
        usedAt: new Date(),
      },
    })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mudclaw.net'
    const claimUrl = `${baseUrl}/claim/${claimToken}`

    return NextResponse.json({
      agent_id: agent.id,
      name: agent.name,
      api_key: apiKey,
      claim_url: claimUrl,
      claim_expires_at: agent.claimExpiresAt!.toISOString(),
    }, { status: 201 })
  } catch (error) {
    console.error('Register agent error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}