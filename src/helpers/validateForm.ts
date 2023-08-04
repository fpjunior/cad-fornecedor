import { IValueInput } from "../interface/valueInput.model";

function isNotEmpty(value: any) {
  return value !== undefined && value !== null && value.trim() !== "";
}

export const useValidate = (values: IValueInput, checkSelected: string) => {

  const fields = [
    { name: "money", label: "Valor", required: true, invalidMessage: "Preenchimento obrigatório" },
    { name: "description", label: "Descrição", required: true, invalidMessage: "Preenchimento obrigatório" },
    { name: "check", label: "Opção", required: true, invalidMessage: "Selecione uma opção" },
    { name: "nome", label: "Nome", required: true, invalidMessage: "Preenchimento obrigatório" },
  ];
  // const moneyValue = values.money.replace(/[^0-9]/g, "");

  const errors = {
    // money: "",
    // description: "",
    check: "",
    nome: "",
    categoria: "",
    telefone: "",
    marca: "",
  };

  // if (!values.money) {
  //   errors.money = "Preenchimento obrigatório";
  // }

  // if (values.money !== moneyValue) {
  //   errors.money = "Preenchimento inválido";
  // }

  // if (!values.description) {
  //   errors.description = "Preenchimento obrigatório";
  // }

  if (!checkSelected) {
    errors.check = "Selecione uma opção";
  }

  // if (!values.nome) {
  //   errors.money = "Preenchimento obrigatório";
  // }

  return errors;
};
