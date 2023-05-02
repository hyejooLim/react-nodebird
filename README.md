# 🐦 react-nodebird

react-nodebird는 `React`, `Next.js` 프레임워크를 사용하여 만든 SNS 서비스입니다. </br>
(제로초 님의 강의를 통해 학습하며 개발한 클론코딩 프로젝트입니다.)

</br></br>

## 🌼 기술 스택

</br>

> ### Frontend
* React Hooks
* Redux
* Redux saga
* Ant Design
* Styled Components
* Immer

</br>

> ### Backend
* Next.js(SSR)
* Node
* Express
* Sequelize(MySQL)
* SWR

</br></br>

## 🚀 AWS 배포

### 1. EC2 생성
프론트 서버 배포

1. [AWS](console.aws.amazon.com) 접속
2. 우측 상단 > 지역 > 아시아 태평양 (서울)
3. EC2 > 인스턴스 시작
4. 원하는 서버 선택 (본 프로젝트에서는 Ubuntu)
5. 인스턴스 유형 선택 (프리티어: 무료)
6. 보안 그룹 구성 > HTTP, HTTPS 추가 (IP 0.0.0.0 -> 모든 IP에서 접근 가능) SSH(개발 터미널)는 집의 IP를 작성하여 해커들이 접근하지 못하도록 방지
7. 키 페어 생성 > 키 페어 이름 작성 후 다운로드 (다운로드된 키 페어는 프로젝트의 루트 경로에 추가 후 .gitignore에 키 페어 파일 추가)
8. EC2 > 실행 중인 인스턴스에서 인스턴스 상태가 running인지 확인
9. 프론트 인스턴스 선택 > 왼쪽 상단 > 연결 버튼 > ssh i ~ 복사
10. 개발 환경 터미널 > 키 페어가 있는 경로(루트 경로) > 복사한 링크 입력 후 엔터 > "yes"
11. EC2 서버에 접속됨 > git clone <깃허브 레포지토리 주소>
12. cd 프론트 폴더 경로

</br>

+ 깃허브 레포지토리에 변경사항이 있으면 git pull (EC2 서버에서는 깃허브의 변경사항을 알지 못함)

</br>

### 2. 우분투에 노드 설치
```ssh
node -v 
```

node가 존재하지 않으면 node 설치 (프론트 폴더에서 진행)

</br>

```ssh
sudo apt-get update
sudo apt-get install -y build-essential
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash --
sudo apt-get install -y nodejs
```

npm i
