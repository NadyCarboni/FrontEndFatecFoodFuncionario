import React, { useEffect, useState } from "react";

import api from "../../../services/api";

export default function Adicional({ adicionalId }: any) {
  const [adicional, setAdicional] = useState<any>();
  const getNomeAdicional = async () => {
    try {
      const response = await api.get(`/Adicional/Individual?id=${adicionalId}`);

      setAdicional(response.data.data[0]);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getNomeAdicional();
  }, []);

  return <li className="m-2 small poppins"> - {adicional?.nome}</li>;
}
