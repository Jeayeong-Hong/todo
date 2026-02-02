"use client";

import { KeyboardEvent, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Badge from "../components/Badge";
import { ImageButton } from "../components/Button";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import TodoListItem from "../components/TodoListItem";
import { createItem, getItems, updateItem } from "../lib/api";
import { TodoItem } from "../lib/types";

export default function Home() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 모바일 화면 감지
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const todoItems = useMemo(
    () => items.filter((item) => !item.isCompleted),
    [items],
  );
  const doneItems = useMemo(
    () => items.filter((item) => item.isCompleted),
    [items],
  );

  // 버튼 상태: 입력이 있는지 확인
  const isAddButtonActive = input.trim().length > 0;

  // 초기 목록 로드
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const data = await getItems();
        setItems(data);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  // 할 일 추가
  const handleAddItem = async () => {
    if (!input.trim()) return;

    try {
      setIsSubmitting(true);
      const newItem = await createItem({ name: input.trim() });
      setItems((prev) => [newItem, ...prev]);
      setInput("");
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "추가에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddItem();
    }
  };

  // 완료 토글
  const handleToggle = async (item: TodoItem) => {
    const nextState = !item.isCompleted;
    const previousItems = items;
    setItems((prev) =>
      prev.map((target) =>
        target.id === item.id ? { ...target, isCompleted: nextState } : target,
      ),
    );

    try {
      const updated = await updateItem(item.id, { isCompleted: nextState });
      setItems((prev) =>
        prev.map((target) => (target.id === item.id ? updated : target)),
      );
    } catch (toggleError) {
      setItems(previousItems);
      setError(toggleError instanceof Error ? toggleError.message : "변경 실패");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <Header />

        <div className="search-container">
          <div className="search-field">
            <input
              className="search-input"
              placeholder="할 일을 입력해주세요"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleEnter}
            />
          </div>
          <ImageButton
            imageSrc={isMobile
              ? `/btn/Add-btn-small(${isAddButtonActive ? "A" : "D"}).png`
              : `/btn/Add-btn(${isAddButtonActive ? "A" : "D"}).png`
            }
            imageAlt="추가하기"
            imageWidth={isMobile ? 46 : 168}
            imageHeight={56}
            onClick={handleAddItem}
            disabled={isSubmitting || !isAddButtonActive}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="todo-grid">
          <section className="todo-column">
            <Badge tone="todo" />
            {isLoading ? (
              <p className="empty-description">목록을 불러오는 중...</p>
            ) : todoItems.length === 0 ? (
              <EmptyState type="todo" />
            ) : (
              todoItems.map((item) => (
                <TodoListItem key={item.id} item={item} onToggle={handleToggle} />
              ))
            )}
          </section>

          <section className="todo-column">
            <Badge tone="done" />
            {isLoading ? (
              <p className="empty-description">목록을 불러오는 중...</p>
            ) : doneItems.length === 0 ? (
              <EmptyState type="done" />
            ) : (
              doneItems.map((item) => (
                <TodoListItem key={item.id} item={item} onToggle={handleToggle} />
              ))
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
