export const prerender = false;

export async function POST(req: Request) {
	console.log(await req.json());

	return new Response(null, { status: 200 });
};
