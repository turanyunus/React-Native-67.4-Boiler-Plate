import { useState } from 'react';

export const useInputHook = (params: any) => {
  const [inputs, setInputs] = useState(params);

  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return [inputs, handleChange] as const;
};
