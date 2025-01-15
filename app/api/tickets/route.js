import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request) {
  
  try {
    const ticket = await request.json();

    // Validate request body
    if (!ticket.title || !ticket.body || !ticket.priority) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get Supabase instance
    const supabase = createRouteHandlerClient({cookies});

    // Get current user session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Insert the data
    const { data, error } = await supabase
      .from("Tickets")
      .insert({
        ...ticket,
        user_email: session.user.email,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
