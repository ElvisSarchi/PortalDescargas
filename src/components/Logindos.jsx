import React from 'react';
import Input from "./Input.astro";

export default function Logindos() {
    const metodo = () => {
        console.log(`hola`);
      };
      
    return (
        <div class="rounded-xl p-5 border m-5">
        <div>
          <img src="/SaciApp.svg" class="bg-white py-2 px-5 rounded-lg" />
        </div>
        <div class="relative mb-6 mt-5">
        
        </div>
      
        <div class="relative mb-6">
        
        </div>
      
        <div class="mb-6 flex items-center justify-between">
          <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]"></div>

          <a href="#!">¿Olvido su contraseña?</a>
        </div>
      
        <button
          type="button"
          onClick={metodo}
          class="rounded-xl py-2 px-4 bg-saciblue text-white hover:bg-saciblue/80 w-full"
        >
          Ingresar
        </button>
      </div>
      
    );
}
