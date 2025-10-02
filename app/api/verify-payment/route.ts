import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export const POST = async (req: NextRequest) => {
  const { transaction_id } = await req.json();
  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );
    console.log("response", response.data);
    if (
      response.data.status === "success" &&
      response.data.data.status === "successful"
    ) {
      return NextResponse.json({ verified: true }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ verified: false }, { status: 400 });
  }
};
