import Link from "next/link";
import { TodoItem } from "../lib/types";

interface TodoListItemProps {
    item: TodoItem;
    onToggle: (item: TodoItem) => void;
}

// 목록에서 사용하는 할 일 아이템 컴포넌트
export default function TodoListItem({ item, onToggle }: TodoListItemProps) {
    return (
        <div className={`todo-item ${item.isCompleted ? "todo-item-done" : ""}`}>
            <button
                className={`check-button ${item.isCompleted ? "check-button-on" : ""}`}
                type="button"
                aria-label={item.isCompleted ? "완료 해제" : "완료"}
                onClick={() => onToggle(item)}
            />
            <Link className="todo-title" href={`/items/${item.id}`}>
                {item.name}
            </Link>
        </div>
    );
}
