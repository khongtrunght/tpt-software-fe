import { utils, write, WorkSheet } from "xlsx-js-style";
import { saveAs } from "file-saver";

export class XlsxService {
  static fortmatWSFile({
    ws,
    cellsToFormat,
    colWidths,
  }: {
    ws: WorkSheet;
    cellsToFormat: any[];
    colWidths: number[];
  }): void {
    // Set column widths
    if (colWidths.length > 0) {
      ws["!cols"] = colWidths.map((width) => {
        return { wch: width };
      });
    }
    // Apply the style to all cells in the worksheet
    for (const cell in ws) {
      // Skip properties that are not cells (like '!ref' or '!merges')
      if (cell[0] === "!") continue;
      const existingStyle = ws[cell].s || {};
      ws[cell].s = {
        ...existingStyle,
        // ...centerStyle, adjust as needed
      };
    }
    // Apply formatting to custom cells
    cellsToFormat.forEach((cellAddress) => {
      applyCustomFgColor(ws, cellAddress);
    });
  }
  static applyStyleToRange(
    ws: any,
    startCell: string,
    endCell: string,
    style: any
  ) {
    const start = utils.decode_cell(startCell);
    const end = utils.decode_cell(endCell);

    for (let R = start.r; R <= end.r; ++R) {
      for (let C = start.c; C <= end.c; ++C) {
        const cellRef = utils.encode_cell({ r: R, c: C });
        if (!ws[cellRef]) ws[cellRef] = { t: "s", v: "" }; // create a new cell if it doesn't exist
        ws[cellRef].s = style;
      }
    }
  }

  static generateFile(
    aoa: any[][],
    fileName: string,
    sheetName: string,
    cellsToFormat: any[],
    colWidths?: number[]
  ): void {
    const worksheet = utils.aoa_to_sheet([[]]);
    utils.sheet_add_aoa(worksheet, aoa);

    this.fortmatWSFile({
      ws: worksheet,
      cellsToFormat,
      colWidths: colWidths || [
        3.4, 10.6, 12, 10.6, 10.8, 32.8, 12.6, 15, 5.6, 9.8, 11.2, 14.4, 7,
        13.8, 8.8,
      ],
    });
    const wb = utils.book_new();
    utils.book_append_sheet(wb, worksheet, sheetName);
    const excelBuffer = write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    this.saveAsExcelFile(excelBuffer, fileName);
  }

  static saveAsExcelFile(buffer: ArrayBuffer, fileName: string): void {
    const EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENSION = ".xlsx";
    const data = new Blob([buffer], { type: EXCEL_TYPE });

    saveAs(
      data,
      fileName + "_export_" + new Date().toDateString() + EXCEL_EXTENSION
    );
  }
}
function applyCustomFgColor(ws: any, cellAddress: any) {
  if (!ws[cellAddress]) ws[cellAddress] = {};
  ws[cellAddress].s = {
    fill: {
      fgColor: { rgb: "FFA500" }, // Orange, change as needed
    },
    // border: borderStyle, adjust as needed
  };
}
