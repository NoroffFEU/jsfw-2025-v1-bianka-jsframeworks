import type { Product, ProductResponse, ProductsResponse } from '../types/product'

const API_BASE_URL = 'https://v2.api.noroff.dev'

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const payload = await fetchJson<ProductsResponse>('/online-shop', { signal })
  return payload.data
}

export async function getProduct(id: string, signal?: AbortSignal): Promise<Product> {
  const payload = await fetchJson<ProductResponse>(`/online-shop/${id}`, { signal })
  return payload.data
}
