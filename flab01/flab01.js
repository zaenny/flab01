//deepcopy
//mapdeepcopy

function deepCopyObj(value) {
  if (value === null || typeof value !== Object) {
    return value;
  }

  if (value instanceof Map) {
    var result = new Map();
    value.forEach((val, key) => {
      result.set(deepCopyObj(key), deepCopyObj(val));
    });
    return result;
  }

  if (value instanceof Set) {
    var result = new Set();
    value.forEach((item) => {
      result.add(deepCopyObj(item));
    });

    return result;
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepCopyObj(item));
  }
}

// 테스트 함수
function testMap() {
  console.log("=== Map 테스트 ===");

  // 테스트용 Map 객체 생성
  const originalMap = new Map();
  originalMap.set("key1", "value1");
  originalMap.set("key2", { name: "홍길동", age: 30 });

  // 깊은 복사 수행
  const copiedMap = deepCopyObj(originalMap);

  // 테스트 1: 원본과 복사본이 다른 참조인지 확인
  console.log("원본과 복사본이 다른 참조인가?", originalMap !== copiedMap);

  // 테스트 2: 복사본이 원본의 값을 제대로 가지고 있는지 확인
  console.log("key1의 값이 동일한가?", copiedMap.get("key1") === "value1");
  console.log("key2의 값 : ", copiedMap.get("key2"));
  console.log(
    "key2의 name이 동일한가?",
    copiedMap.get("key2").name === "홍길동"
  );

  // 테스트 3: 원본 변경이 복사본에 영향을 주지 않는지 확인
  originalMap.get("key2").age = 31;
  console.log("원본의 age:", originalMap.get("key2").age);
  console.log("복사본의 age:", copiedMap.get("key2").age);
  console.log(
    "원본 변경이 복사본에 영향을 주지 않는가?",
    copiedMap.get("key2").age === 30
  );
}

function testSet() {
  console.log("\n=== Set 테스트 ===");

  // 테스트용 Set 객체 생성
  const originalSet = new Set();
  originalSet.add("value1");
  originalSet.add({ name: "홍길동", age: 30 });

  // 깊은 복사 수행
  const copiedSet = deepCopyObj(originalSet);

  // 테스트 1: 원본과 복사본이 다른 참조인지 확인
  console.log("원본과 복사본이 다른 참조인가?", originalSet !== copiedSet);

  // 테스트 2: 복사본의 크기가 원본과 같은지 확인
  console.log("크기가 동일한가?", copiedSet.size === originalSet.size);

  // 테스트 3: 원본 변경이 복사본에 영향을 주지 않는지 확인
  // 원본 Set에서 객체 찾기
  let originalObj = null;
  originalSet.forEach((item) => {
    if (typeof item === "object" && item !== null) {
      originalObj = item;
    }
  });

  // 복사본 Set에서 객체 찾기
  let copiedObj = null;
  copiedSet.forEach((item) => {
    if (typeof item === "object" && item !== null) {
      copiedObj = item;
    }
  });

  // 원본 객체 변경
  originalObj.age = 31;

  console.log("원본의 age:", originalObj.age);
  console.log("복사본의 age:", copiedObj.age);
  console.log("원본 변경이 복사본에 영향을 주지 않는가?", copiedObj.age === 30);
}

function testDate() {
  console.log("\n=== Date 테스트 ===");

  // 테스트용 Date 객체 생성
  const originalDate = new Date("2023-01-01");

  // 깊은 복사 수행
  const copiedDate = deepCopyObj(originalDate);

  // 테스트 1: 원본과 복사본이 다른 참조인지 확인
  console.log("원본과 복사본이 다른 참조인가?", originalDate !== copiedDate);

  // 테스트 2: 복사본이 원본과 같은 시간을 가지는지 확인
  console.log(
    "시간이 동일한가?",
    copiedDate.getTime() === originalDate.getTime()
  );

  // 테스트 3: 원본 변경이 복사본에 영향을 주지 않는지 확인
  originalDate.setMonth(1); // 2월로 변경

  console.log("원본의 월:", originalDate.getMonth());
  console.log("복사본의 월:", copiedDate.getMonth());
  console.log(
    "원본 변경이 복사본에 영향을 주지 않는가?",
    copiedDate.getMonth() === 0
  );
}

function testRegExp() {
  console.log("\n=== RegExp 테스트 ===");

  // 테스트용 RegExp 객체 생성
  const originalRegExp = /test/gi;

  // 깊은 복사 수행
  const copiedRegExp = deepCopyObj(originalRegExp);

  // 테스트 1: 원본과 복사본이 다른 참조인지 확인
  console.log(
    "원본과 복사본이 다른 참조인가?",
    originalRegExp !== copiedRegExp
  );

  // 테스트 2: 복사본이 원본과 같은 패턴을 가지는지 확인
  console.log(
    "패턴이 동일한가?",
    copiedRegExp.source === originalRegExp.source
  );

  // 테스트 3: 복사본이 원본과 같은 플래그를 가지는지 확인
  console.log(
    "플래그가 동일한가?",
    copiedRegExp.flags === originalRegExp.flags
  );

  // 테스트 4: 패턴 일치 동작이 같은지 확인
  const testString = "TEST test Test";
  const originalMatches = testString.match(originalRegExp);
  const copiedMatches = testString.match(copiedRegExp);

  console.log("원본 정규식 결과:", originalMatches);
  console.log("복사본 정규식 결과:", copiedMatches);
  console.log(
    "결과가 동일한가?",
    JSON.stringify(originalMatches) === JSON.stringify(copiedMatches)
  );
}

// 모든 테스트 실행
testMap();
testSet();
testDate();
testRegExp();
