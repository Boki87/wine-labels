import qrcode from "qrcode";

export async function POST(req: Request) {
  const body = await req.json();

  const labelUrl = process.env.APP_URL + "label/" + body.productId;
  try {
    const qrCodeSvg = await qrcode.toString(labelUrl, {
      errorCorrectionLevel: "H",
      type: "svg",
    });

    const qrCodePng = await qrcode.toDataURL(labelUrl, {
      errorCorrectionLevel: "H",
      width: 500,
    });
    return new Response(JSON.stringify({ svg: qrCodeSvg, png: qrCodePng }), {
      status: 200,
    });
  } catch (e) {
    return new Response(null, { status: 500 });
  }
}
