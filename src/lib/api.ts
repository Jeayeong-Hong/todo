import { CreateItemPayload, TodoItem, UpdateItemPayload } from "./types";

// Todo API 공통 설정
const API_BASE = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID ?? "jaeyoung";
const BASE_URL = `${API_BASE}/${TENANT_ID}`;

async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "요청에 실패했습니다.");
  }

  return (await response.json()) as T;
}

// 할 일 목록 조회
export async function getItems(): Promise<TodoItem[]> {
  return requestJson<TodoItem[]>("/items", { method: "GET" });
}

// 할 일 단건 조회
export async function getItem(itemId: number): Promise<TodoItem> {
  return requestJson<TodoItem>(`/items/${itemId}`, { method: "GET" });
}

// 할 일 추가
export async function createItem(payload: CreateItemPayload): Promise<TodoItem> {
  return requestJson<TodoItem>("/items", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// 할 일 수정
export async function updateItem(
  itemId: number,
  payload: UpdateItemPayload,
): Promise<TodoItem> {
  return requestJson<TodoItem>(`/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// 할 일 삭제
export async function deleteItem(itemId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "삭제에 실패했습니다.");
  }
}

// 이미지 업로드
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "이미지 업로드에 실패했습니다.");
  }

  const data = (await response.json()) as { imageUrl?: string; url?: string };
  return data.imageUrl ?? data.url ?? "";
}
