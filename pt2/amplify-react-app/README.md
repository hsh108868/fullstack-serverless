# AWS Amplify 시작하기

Amplify로 API 생성하고 통신하는 방법을 배웁니다.

## 서버리스 함수 생성과 배포

```
amplify add function
```

서버리스 함수는 **이벤트 기반**이고 **수명이 짧으며**(한 번의 호출동안 지속 가능하다) **스테이트리스 컴퓨팅 컨테이너**에서 코드를 실행한다. 이런 서버리스 함수는 **확장이 원활하**며 **서버 작업이 필요하지 않다.** 서버리스 함수는 API 요청 **뿐만이 아니라** 다른 다양한 이벤트에 의해서도 호출 될 수 있다. 함수를 처음 호출하면 인스턴스를 생성하고 핸들러 기능을 실행해 이벤트를 처리한다. 만약 이벤트가 처리되는 동안에 또 다른 호출이 발생하면 또 다른 인스턴스가 생성된다. **AWS Lambda** 같은 서비스를 사용하면 기존의 인프라와는 다르게 사용한 만큼만 비용을 내고 코드를 실행하는 데 걸리는 시간에 따라 요금이 부과된다.


## 코드 살펴보기 (코드는 src 폴더에 있음)

함수를 생성하면 amplify/backend 디렉터리 안에 function이라는 이름의 디렉터리가 생성되며 CLI를 이용해 생성되는 **모든 함수**는 이 디렉터리 안에 저장된다.

cryptofunction 디렉터리 안에서는 src/index.js에서 exports.handler 코드를 확인 할 수 있다. 이것은 함수 호출의 시작 지점으로 함수가 호출되었을 때 실행되는 코드이다.

```javascript
awsServerlessExpress.proxy(server, event, context);
```

는 이벤트, 콘텍스트 및 경로가 app.js에서 실행 중인 익스프레스 서버로 전달되는 위치이다. 이러면 API에 대해 생성한 모든 경로에 대해 HTTP요청을 생성할 수 있다.


## API 추가

Amazon API Gateway를 사용한다. API Gateway는 개발자가 REST 또는 웹소켓 API를 **생성, 게시, 유지, 모니터링 및 보호**할 수 있도록 지원하는 관리형 서비스이다.

```
amplify add api
```

## API와 Lambda 함수 배포

```
amplify push
```

Amlify status 명령어를 이용하여 프로젝트의 현재 상태를 확인할 수 있다.

## 새 API와 통신

### Amplify와 함께 동작하도록 클라이언트 애플리케이션 설정

애플리케이션에서 Amplify 클라이언트 라이브러리를 사용하려면 CLI가 aws-exports.js 파일에 추가한 리소스에 대한 정보를 Amplify와 함께 동작하도록 root에서 설정해야 한다. 그러기 위해 index.js에 다음과 같이 추가한다.

```javascript
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
```

### Amplify 클라이언트 API 카테고리

Amplify 클라이언트 라이브러리에는 Auth, S3와 같은 다양한 API 카테고리가 존재한다.

```javascript
API.get(apiName:String, path:String, data?:Object)
```

### 다른 API를 호출하도록 함수 수정

Axios 라이브러리를 사용해 CoinLore API를 호출하도록 수정한다.


