// Todo API 타입 정의
export interface TodoItem {
  id: number;
  name: string;
  memo?: string | null;
  imageUrl?: string | null;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateItemPayload {
  name: string;
}

export interface UpdateItemPayload {
  name?: string;
  memo?: string | null;
  imageUrl?: string | null;
  isCompleted?: boolean;
}
