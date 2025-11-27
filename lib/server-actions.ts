'use server';

export async function greetUser(name: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    success: true,
    message: `Hello, ${name}! This came from server actions.`,
    timestamp: new Date().toISOString(),
  };
}

export async function calculateSum(a: number, b: number) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    success: true,
    result: a + b,
    operation: `${a} + ${b}`,
  };
}
