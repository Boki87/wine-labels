import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { first_name, last_name, email_addresses, id } = body.data;
  const newProfile = await db.profile.create({
    data: {
      firstName: first_name,
      lastName: last_name,
      email: email_addresses[0].email_address,
      userId: id,
    },
  });
  return new Response(JSON.stringify(newProfile), { status: 200 });
}
