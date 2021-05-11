# Demo

[개발 서버](http://3.112.186.197/)

[Vercel 데모 (개발 서버 반영전)](https://survey-next-five.vercel.app/)

# 서버

- aws linux 2
- nginx
- node.js
- pm2
- MySql

## DB

접속에는 환경변수 설정이 필요

## 개요

설문 또는 질문작성가능 웹앱

## 기술 스택

- Node.js API Server on Next.js
- React.js (on Next.js)
- React Hooks
- Typescript
- Scss (Sass)
- MySql (예정)
- EsLint (예정)
- etc..

## 개발환경 구축 및 테스트

패키지 관리에는 yarn을 이용하며 next.js를 이용해 서버사이드 react를 제공

순수 React였던 survey-proto 리포지토리 소스를 next.js화 시킨 후 hard push - 21/4/30

- 의존라이브러리 설치 (yarn이 설치 되어있어야함)

```
yarn
```

- 디버그 모드에서 실행

```
yarn dev
```

- 빌드

```
yarn build
```

- 서브 (실행)

```
yarn start
```

## StyleSheet

**style/styls.scss** 파일에 개별파일 import해서 이용

```
//globals.scss
@import "globals"; //import _globals.scss
@import "keyframes"; // import _keyframes.scss
@import "app"; // import _app.scss
```

## 구현목표 기능

### 일반

- [ ] 메인페이지
- [ ] 이용방법 페이지
- [ ] 다국어화
- [ ] 유료 광고

### 백엔드

- [ ] 도메인 취득
- [ ] 서버 구축
- [ ] 데이터 베이스 구축

### 등록 분야

- [x] 설문 작성
- [x] 주관식형 질문
- [x] 단수선택형 질문
- [ ] 복수선택형 질문
- [ ] OX퀴즈형 질문
- [ ] 조건분기형 질문

### 응답 분야

- [x] 설문 표시
- [x] 주관식형 질문
- [x] 단수선택형 질문
- [ ] 복수선택형 질문
- [ ] OX퀴즈형 질문
- [ ] 조건분기형 질문

## 과제 및 목표

- 인증 정보 없을 경우 리다이렉트를 어떻게 할지
- 인증을 어떻게 할건지
- api 헤더에 무엇을 위해 뭘 담을지
- 역할분담을 어떡할지
