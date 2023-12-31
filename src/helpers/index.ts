import { DateTime } from "luxon";

//generar ids
export const getCurrentTimestamp = () =>
  new Date().getTime().toLocaleString().replace(/,/g, "");

//formatear fecha con luxon
const date = DateTime.local();
export const formattedDate = date.setLocale("pt").toFormat("cccc, d LLL y");

//formatear el precio
export const formatQuantity = (quantity: number) => {
  return Number(quantity).toLocaleString("pt-BR", {
    style: "currency",
    currency: "ARS",
  });
};

//mes actual
export const currentMonth = date.setLocale("pt").toFormat("LLL");
