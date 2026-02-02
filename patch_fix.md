# UI 크기 수정 방법

다음 파일들을 수정해주세요:

## 1. Badge.tsx (c:\Users\재영\todolist\src\components\Badge.tsx)

18-19번째 줄을 수정:
```tsx
// 현재
width={isMobile ? 100 : 150}
height={40}

// 변경 후
width={isMobile ? 70 : 100}
height={isMobile ? 28 : 36}
```

## 2. globals.css (c:\Users\재영\todolist\src\app\globals.css)

### 검색 컨테이너 (약 107번째 줄):
```css
/* 현재 */
.search-container {
  width: 1016px;
}

/* 변경 후 */
.search-container {
  width: 1200px;
}
```

### 검색 입력창 (약 121번째 줄):
```css
/* 현재 */
.search-input {
  left: 24px;
  right: 200px;
  ...
}

/* 변경 후 */
.search-input {
  left: 24px;
  width: 800px;
  ...
}

/* 추가 */
.search-container .image-btn {
  position: absolute;
  right: 0;
  top: 0;
}
```

### Badge (약 186번째 줄):
```css
/* 현재 */
.badge {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 101px;
  height: 36px;
  border-radius: 23px;
  padding: 4px 27px 7px 27px;
  gap: 10px;
  margin-bottom: 12px;
}

.badge img {
  width: auto;
  height: 100%;
  max-height: 25px;
}

/* 변경 후 */
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 23px;
  padding: 6px 20px;
  margin-bottom: 12px;
}

.badge img {
  width: auto;
  height: auto;
}
```

이렇게 수정하면 Badge와 Add 버튼이 제대로 표시됩니다.
