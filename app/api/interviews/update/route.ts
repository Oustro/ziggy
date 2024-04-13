import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export async function PUT(request: NextRequest) {
  const session = await getServerSession({ req: request, ...authOptions });

  if (!session) {
    return NextResponse.json({ message: "not authenicated" }, { status: 401 });
  }

  const interviewInfo = (await request.json()) as {
    name: string;
    purpose: string;
    collect: boolean;
    questions: string[];
    interviewid: string;
    rewardURL: string;
  };

  try {
    await prisma.interview.update({
      where: {
        id: interviewInfo.interviewid,
      },
      data: {
        name: interviewInfo.name,
        purpose: interviewInfo.purpose,
        collect: interviewInfo.collect,
        rewardURL: interviewInfo.rewardURL,
        guide: {
          deleteMany: {},
        },
      },
    });

    for (let i = 0; i < interviewInfo.questions.length; i++) {
      await prisma.guideQuestions.create({
        data: {
          question: interviewInfo.questions[i],
          interviewId: interviewInfo.interviewid,
        },
      });
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
