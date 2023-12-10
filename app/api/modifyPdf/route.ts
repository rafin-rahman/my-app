import { NextResponse } from "next/server";
import fs from "fs";
import { PDFDocument, StandardFonts } from "pdf-lib";
import path from "path";

export async function POST(request: Request) {
  // @ts-ignore
  const formData = await request.json();
  console.log("formData is working", formData.dateOfBirth);
  const filePath = path.join(process.cwd(), "public", "pn1", "2023-24test.pdf");
  const pn1_2023_24 = fs.readFileSync(filePath);

  const pdfDoc = await PDFDocument.load(pn1_2023_24);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pages = pdfDoc.getPages();
  const page3 = pages[3];
  const page4 = pages[4];

  // tittle
  const [xTitle, yTitle] = formData.title.split(",");
  page3.drawText("V", {
    x: parseInt(xTitle),
    y: parseInt(yTitle),
    size: 12,
  });

  // first name
  page3.drawText(formData.firstName, { x: 300, y: 710, size: 12 });

  // last name
  page3.drawText(formData.lastName, { x: 300, y: 682, size: 12 });

  // gender
  const [xGender, yGender] = formData.gender.split(",");
  page3.drawText("V", {
    x: parseInt(xGender),
    y: parseInt(yGender),
    size: 12,
  });

  // Date of birth
  let xOffsetDateOfBirth = 300; // starting x position
  for (const char of formData.dateOfBirth) {
    page3.drawText(char, {
      x: xOffsetDateOfBirth,
      y: 597,
      size: 12,
      font: font,
    });
    const widthOfChar = font.widthOfTextAtSize(char, 12);
    xOffsetDateOfBirth += widthOfChar + 14; // move to the next character position
  }

  // place of birth
  page3.drawText(formData.placeOfBirth, { x: 300, y: 535, size: 12 });

  // nationality
  page3.drawText(formData.nationality, { x: 300, y: 507, size: 12 });

  // national insurance number
  let xOffsetNationalInsuranceNumber = 295; // starting x position
  for (const char of formData.nationalInsuranceNumber) {
    page3.drawText(char, {
      x: xOffsetNationalInsuranceNumber,
      y: 482,
      size: 12,
      font: font,
    });
    const widthOfChar = font.widthOfTextAtSize(char, 12);
    xOffsetNationalInsuranceNumber += widthOfChar + 14; // move to the next character position
  }

  // hold uk passport
  const [xHoldUkPassport, yHoldUkPassport] = formData.holdUkPassport.split(",");
  page3.drawText("V", {
    x: parseInt(xHoldUkPassport),
    y: parseInt(yHoldUkPassport),
    size: 12,
  });

  // previous loan SLC
  const [xPreviousLoanSLC, yPreviousLoanSLC] =
    formData.previousLoanSLC.split(",");
  page4.drawText("V", {
    x: parseInt(xPreviousLoanSLC),
    y: parseInt(yPreviousLoanSLC),
    size: 12,
  });

  const finalPdfContent = await pdfDoc.save();
  const documentName = "customised.pdf";
  const outputFilePath = path.join(
    process.cwd(),
    "public",
    "modifiedPDF",
    documentName
  );

  fs.writeFileSync(outputFilePath, Buffer.from(finalPdfContent));
  return NextResponse.json({
    message: `New PDF document has been created ${documentName}`,
  });
}
