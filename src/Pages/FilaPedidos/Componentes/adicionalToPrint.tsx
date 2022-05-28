import React, { useEffect, useState } from "react";

import api from "../../../services/api";

export default function AdicionalToPrint({ adicionalId }: any) {
  const [adicional, setAdicional] = useState<any>();
  const getNomeAdicional = async () => {
    const response = await api.get(`/Adicional/Individual?id=${adicionalId}`);

    setAdicional(response.data.data[0]);
    console.log(response.data.data[0]);
  };

  useEffect(() => {
    getNomeAdicional();
  }, []);

  return <li className=" poppins"> - {adicional?.nome}</li>;
}
