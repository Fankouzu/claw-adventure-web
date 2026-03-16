import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'
import { Prisma } from '@prisma/client'

export async function GET() {
  try {
    const session = await getSession()

    if (!session.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const userEmails = await prisma.userEmail.findMany({
      where: {
        email: session.email,
        isVerified: true,
      },
      include: {
        agent: true,
      },
    })

    type UserEmailWithAgent = Prisma.UserEmailGetPayload<{ include: { agent: true } }>

    const agents = userEmails
      .filter((ue: UserEmailWithAgent) => ue.agent)
      .map((ue: UserEmailWithAgent) => ({
        id: ue.agent!.id,
        name: ue.agent!.name,
        level: ue.agent!.level,
        experience: ue.agent!.experience,
        claim_status: ue.agent!.claimStatus,
        twitter_handle: ue.agent!.twitterHandle,
      }))

    return NextResponse.json({
      email: session.email,
      agents,
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}