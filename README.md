# Semi Resume Sharing Service

사람인, 로켓펀치 같은 채용 서비스를 모티브하여 개발자들의 세미 이력서를 유저들과 공유하는 서비스입니다.

**참여자 : 1명**


**사용한 스택**
Frontend
- React
- Next 
- styled-components
- Redux-toolkit
- React-query

Backend
- Node
- Express
- Mysql
- Sequelize

**구현한 기술**
회원가입 / 패스포트 로그인 / 로그아웃
페이지네이션 / 필터링 검색
게시글 등록, 게시글 삭제, 게시글 수정, 프로필 사진 등록


# Time Line
### 2022/07/20
1. db설계
2. 페이지 구성
3. 기초 css 작업 ( with.Figma )
4. Mysql - Sequelize - node 연결

### 2022/07/21
1. 리덕스 설정 / next와 리덕스 툴킷 연동, rootReducer 설정, slice 구현, action 구현
2. back 기본 회원가입 api
3. front 기본 회원가입 api
4. 회원가입 성공

### 2022/07/22
1. passport 로그인
2. 로그아웃
3. 로그인 정보 조회
4. SSR

### 2022/07/23
1. 이력서 페이지 임시 css 작성 ( 90% 완성)
2. 이력서 페이지 작성 시 db에 추가 완료 

### 2022/07/25
1. multer 이용하여 이미지 확인, db에 저장 ( *시간을 많이 썼음, 나중에 다시 공부)

### 2022/07/26
1. 메인 포스트 카드 css 임시 작업
2. 모든 게시글 조회
3. 무한 스크롤

### 2022/07/27
1. 개인 게시글 조회
2. 구직 활동 기능
3. 개인 게시글 지우기

### 2022/07/29
1. 무한 스크롤 -> 페이지네이션으로 변경
2. 페이지네이션을 위한 react-query 사용

### 2022/07/31
1. 필터링 추가

### 2022/08/02
1. 페이지네이션 업데이트
2. 게시글 상세 페이지 Figma 작업
3. 게시글 상세 페이지 정보 받아오기 완료
4. 게시글 상세 페이지 임시 css 작업, 받아온 정보 브라우저에 출력

### 2022/08/03
1. 메인 슬라이더
2. 메인 유저 프로필
3. 메인 로고 추가
4. 페이지네이션 버그 수정

### 2022/08/04 ~ 08/06 버그 수정

### 2022/08/07
1. 스택 버그 수정
2. 이미지 버튼 기능 수정
3. 이력서 작성 input 박스 버그 수정
4. 최종 css 작업 / 메인 css

### 2022/08/08
버그 수정...

### 2022/08/09
최종 css 완료

### 2022/0810 ~ 0812 배포 후 버그 및 에러 수정
### 2022/0813 s3 등록, 배포


