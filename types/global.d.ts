// types/global.d.ts
declare global {
  var mongoose: {
    conn: any | null;
    promise: Promise<any> | null;
  };
}

// Necesitas exportar algo en este archivo para que sea considerado un módulo.
export {};