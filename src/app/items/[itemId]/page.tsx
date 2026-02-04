"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ImageButton } from "../../../components/Button";
import Header from "../../../components/Header";
import TextInput from "../../../components/TextInput";
import { deleteItem, getItem, updateItem, uploadImage } from "../../../lib/api";

// 상세 페이지: 할 일 수정 및 삭제
export default function ItemDetailPage() {
    const params = useParams();
    const router = useRouter();
    const itemId = Number(params?.itemId);

    const [name, setName] = useState("");
    const [memo, setMemo] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 수정 버튼 상태: 기본 데이터와 비교하여 변경이 있는지 확인
    const [initialData, setInitialData] = useState<{
        name: string;
        memo: string;
        isCompleted: boolean;
        imageUrl: string | null;
    } | null>(null);

    const isEditButtonActive =
        initialData &&
        (name !== initialData.name ||
            memo !== initialData.memo ||
            isCompleted !== initialData.isCompleted ||
            imageUrl !== initialData.imageUrl);

    useEffect(() => {
        const fetchItem = async () => {
            if (!Number.isFinite(itemId)) {
                setError("유효하지 않은 할 일입니다.");
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                const data = await getItem(itemId);
                setInitialData({
                    name: data.name,
                    memo: data.memo ?? "",
                    isCompleted: data.isCompleted,
                    imageUrl: data.imageUrl ?? null,
                });
                setName(data.name);
                setMemo(data.memo ?? "");
                setIsCompleted(data.isCompleted);
                setImageUrl(data.imageUrl ?? null);
            } catch (fetchError) {
                setError(fetchError instanceof Error ? fetchError.message : "불러오기 실패");
            } finally {
                setIsLoading(false);
            }
        };

        fetchItem();
    }, [itemId]);

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError("이미지는 5MB 이하만 업로드할 수 있어요.");
            return;
        }

        if (!/^[A-Za-z0-9._-]+$/.test(file.name)) {
            setError("이미지 파일명은 영어로만 입력해 주세요.");
            return;
        }

        try {
            setIsUploading(true);
            const uploadedUrl = await uploadImage(file);
            setImageUrl(uploadedUrl);
            setError(null);
        } catch (uploadError) {
            setError(uploadError instanceof Error ? uploadError.message : "업로드 실패");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        if (!Number.isFinite(itemId)) return;
        try {
            setIsSaving(true);
            const payload = {
                name,
                memo,
                isCompleted,
                ...(imageUrl ? { imageUrl } : {}),
            };
            await updateItem(itemId, payload);
            router.push("/");
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : "저장 실패");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!Number.isFinite(itemId)) return;
        try {
            setIsSaving(true);
            await deleteItem(itemId);
            router.push("/");
        } catch (removeError) {
            setError(removeError instanceof Error ? removeError.message : "삭제 실패");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="app">
            <div className="container">
                <Header />

                {error && <p className="error-text">{error}</p>}

                {isLoading ? (
                    <p className="empty-description">불러오는 중...</p>
                ) : (
                    <>
                        {/* 상단 바 - 할 일 제목 */}
                        <div className="detail-bar">
                            <label className="toggle-checkbox">
                                <input
                                    id="item-status"
                                    type="checkbox"
                                    checked={isCompleted}
                                    onChange={(event) => setIsCompleted(event.target.checked)}
                                />
                            </label>
                            <TextInput
                                id="item-name"
                                fullWidth
                                className="detail-title-input"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="할 일을 입력해 주세요"
                            />
                        </div>

                        {/* 메인 컨텐츠 영역 */}
                        <div className="detail-content">
                            {/* 왼쪽: 이미지 영역 */}
                            <div className="detail-image-section">
                                <input
                                    id="item-image"
                                    className="file-input-hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={isUploading}
                                />
                                {isUploading && <p className="empty-description">업로드 중...</p>}
                                {imageUrl ? (
                                    <div className="image-preview-large">
                                        <img src={imageUrl} alt="첨부 이미지" />
                                        <ImageButton
                                            imageSrc=""
                                            imageAlt="이미지 수정"
                                            className="image-edit-btn-overlay btn-img-edit"
                                            onClick={() => {
                                                const input = document.getElementById("item-image");
                                                if (input instanceof HTMLInputElement) {
                                                    input.click();
                                                }
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="image-placeholder-large" onClick={() => {
                                        const input = document.getElementById("item-image");
                                        if (input instanceof HTMLInputElement) {
                                            input.click();
                                        }
                                    }}>
                                        <img src="/img/img.png" alt="이미지 추가" className="placeholder-img" />
                                    </div>
                                )}
                            </div>

                            {/* 오른쪽: 메모 영역 */}
                            <div className="detail-memo-section">
                                <div className="memo-container">
                                    <img src="/img/memo.png" alt="Memo" className="memo-background" />
                                    <div className="memo-title">Memo</div>
                                    <textarea
                                        id="item-memo"
                                        className="textarea-large"
                                        value={memo}
                                        onChange={(event) => setMemo(event.target.value)}
                                        placeholder="메모를 입력해 주세요"
                                    />
                                </div>

                                {/* 버튼 영역 - 우측 정렬 */}
                                <div className="detail-actions-right">
                                    <ImageButton
                                        imageSrc=""
                                        imageAlt="수정 완료"
                                        className={isEditButtonActive ? "btn-edit-active" : "btn-edit-default"}
                                        onClick={handleSave}
                                        disabled={isSaving || !isEditButtonActive}
                                    >
                                        수정완료
                                    </ImageButton>
                                    <ImageButton
                                        imageSrc=""
                                        imageAlt="삭제하기"
                                        className="btn-delete"
                                        onClick={handleDelete}
                                        disabled={isSaving}
                                    >
                                        삭제하기
                                    </ImageButton>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
