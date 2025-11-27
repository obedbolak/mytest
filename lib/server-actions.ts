'use server';

export async function greetUser(name: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    success: true,
    message: `Hello, ${name}! This came from server actions.`,
    timestamp: new Date().toISOString(),
  };
}

//lets get some data from fake dataapi using the fetch 
export async function fetchDataFromApi(endpoint: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
  const data = await response.json();
  return data;
}

export async function fetchProducts() {
  try {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
    const products = await data.json();
    return {
      success: true,
      products: products.map((post: any) => ({
        id: post.id,
        title: post.title,
        description: post.body,
      })),
    };
  } catch (error) {
    return {
      success: false,
      products: [],
      error: 'Failed to fetch products',
    };
  }
}

export async function calculateSum(a: number, b: number) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    success: true,
    result: a + b,
    operation: `${a} + ${b}`,
  };
}
