import axios, { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";
import { cacheAdapterEnhancer, retryAdapterEnhancer } from "axios-extensions";
import env from "@/config/env";
import Navigation from "@/utils/navigation";
import stb from "@/data/stb";

const API = axios.create({
  timeout: 10 * 1000,
  baseURL: env.API_ADMIN,
  // withCredentials: true,
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache"
  },
  adapter: retryAdapterEnhancer(axios.defaults.adapter)
  // adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false })
});

API.interceptors.request.use(
  (config) => {
    Navigation.prevent = true;

    config.params = {
      ...config.params,
      domain: "CJHV",
      stbType: "ocap",
      subscribeId: stb.getDeviceInfo().subscriberId
    };
    console.log(`[axios.intercenptors.request]`, config);
    return config;
  },
  (error) => {
    Navigation.prevent = false;

    console.log(
      "[axios.intercenptors.request.error]",
      error.message,
      error.config
    );
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    Navigation.prevent = false;

    console.log(
      `[axios.intercenptors.response]`,
      response.config,
      response.data
    );
    return response;
  },
  (error: AxiosError) => {
    Navigation.prevent = false;

    console.log(`[axios.intercenptors.response.error]`, error);
    if (error.config) {
      //
    } else if (error.config && error.response) {
      //
    } else {
      //
    }
    return Promise.reject(error);
  }
);

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default API;


export const fetcher = <T>(url: string): Promise<T> =>
  API.get<T>(url).then(({ data }) => data);

if (false && !env.isSTB) {
  // https://www.npmjs.com/package/axios-mock-adapter
  const mock = new MockAdapter(API, { delayResponse: 500 });
  mock.onGet(new RegExp("/uipf/v1/club/list/all")).reply((config) => {
    const clubSize = 37;
    const list = clubs.createClubs("", clubSize, config.params);
    return [
      200,
      // { total: clubSize, data: list, regionList: [ { regionCd: "서울", regionNm: "서울" }, { regionCd: "경기", regionNm: "경기" }, ], }
      {"total":4,"regionList":[{"regionCd":"101","regionNm":"서울"},{"regionCd":"107","regionNm":"전남"}],"data":[{"clubId":"C2103091250002C","clubName":"양천교회","chnlNo":110,"imgUrl":"http://10.9.26.202:5091/uipf/public/static/images/cjhv/club/info/f79d0b21-d5d6-49c6-b42a-544c9a60024d.jpg","type":"TXT1","bnrText1":"양천교회"},{"clubId":"C2103091248002B","clubName":"테스트클럽2","chnlNo":120,"imgUrl":"http://10.9.26.202:5091/uipf/public/static/images/cjhv/club/info/54020b7f-44a4-442a-970d-3064c5e871ed.png","type":"TXT2","bnrText1":"첫번째 문구","bnrText2":"두번째 문구"},{"clubId":"C2103091255002D","clubName":"금빛교회","chnlNo":130,"imgUrl":"http://10.9.26.202:5091/uipf/public/static/images/cjhv/club/info/bf327cb4-1fbb-4b63-adda-682f36034f58.jpeg","type":"LOGO","bnrImgUrl":"http://10.9.26.202:5091/uipf/public/static/images/cjhv/club/info/0a8adbb5-f0c2-43fe-ab79-68809f7bedd3.png"},{"clubId":"C21031011070054","clubName":"운산 성결교회","chnlNo":140,"imgUrl":"http://10.9.26.202:5091/uipf/public/static/images/cjhv/club/info/356581c2-7cd2-4d26-b8e8-ddb07df7df22.png","type":"TXT1","bnrText1":"운산 성결교회"}]}
    ];
  });
  mock.onGet(new RegExp("/uipf/v1/club/list/local")).reply((config) => {
    const clubSize = 37;
    const list = clubs.createClubs(
      config.params.regionCd,
      clubSize,
      config.params
    );
    return [
      200,
      // { total: clubSize, data: list }
      {"total":3,"data":[{"clubId":"C2103091250002C","clubName":"양천교회","chnlNo":110,"imgUrl":"http://10.9.26.202:5091/uipf/public/static/images/cjhv/club/info/f79d0b21-d5d6-49c6-b42a-544c9a60024d.jpg","type":"TXT1","bnrText1":"양천교회"},{"clubId":"C2103091255002D","clubName":"금빛교회","chnlNo":130,"imgUrl":"http://10.9.26.202:5091/uipf/public/static/images/cjhv/club/info/bf327cb4-1fbb-4b63-adda-682f36034f58.jpeg","type":"LOGO","bnrImgUrl":"http://10.9.26.202:5091/uipf/public/static/images/cjhv/club/info/0a8adbb5-f0c2-43fe-ab79-68809f7bedd3.png"},{"clubId":"C21031011070054","clubName":"운산 성결교회","chnlNo":140,"imgUrl":"http://10.9.26.202:5091/uipf/public/static/images/cjhv/club/info/356581c2-7cd2-4d26-b8e8-ddb07df7df22.png","type":"TXT1","bnrText1":"운산 성결교회"}]}
    ];
  });
  mock.onGet(new RegExp("/uipf/v1/club/list/join")).reply((config) => {
    const clubSize = 18;
    const list = clubs.createClubs("가입", clubSize, config.params);
    return [
      200,
      {
        total: clubSize,
        data: list,
      },
    ];
  });

  mock.onGet(new RegExp("/clubpf/svc/contents/list")).reply((config) => {
    const contentSize = 18;
    const list = contents.createContents(contentSize, config.params);
    return [
      200,
      // { total: contentSize, data: list }
      {"total":1,"data":[{"contentsId":21,"title":"유튜브연동","contentsType":"YOUTUBE","date":"20210310133848","imgUrl":"http://10.10.113.26:7071/public/static/images/cjhv/contents/ed742f8e-b5e3-41fd-a68c-ed9197ed1050.png","playUrl":"www.youtube.com/watch?v=GoXPbGQl-uQ"}]}
    ];
  });

  mock.onGet(new RegExp("/clubpf/svc/contents/cateList")).reply((config) => {
    return [
      200,
      // { total: contentsCateList.length, data: contentsCateList }
      {"total":2,"data":[{"cateId":"C21031003D","cateName":"전체보기"},{"cateId":"C21031003E","cateName":"설교"}]}
    ];
  });

  mock.onGet(new RegExp("/clubpf/svc/club/info")).reply((config) => {
    return [200,
      // clubHome 
      {"clubId":"C21031011070054","clubName":"운산 성결교회","chnlNo":140,"join":{"joinType":"100","introImg":"http://10.10.113.26:7071/public/static/images/cjhv/homeintro/c44b1ea7-294a-4e0f-af2f-447a1289c3a5.png","introText":"여러분을 환영합니다!"},"menuList":[{"type":"NOTICE","title":"공지 사항"},{"type":"CONT","title":"예배 영상"},{"type":"LIVE","title":"실시간 예배"}],"notice":{"id":42,"title":"운산 성결교회 예배 안내 드립니다.","date":"20210310131331","type":"TXT","text":"안녕하세요.\n운산 성결교회 예배 안내 드립니다.\n\n[주일예배 - 대예배실]\n- 1부 : 오전 7시 30분\n- 2부 : 오전 9시\n- 3부 : 오전 11시\n- 4부 : 오후 1시\n- 5부 : 오후 2시 30분\n\n[주일 오후 찬양예배 - 대예배실]\n- 매주 주일 오후 5시 \n\n[수요예배 - 대예배실]\n- 매주 수요일 저녁 7시\n\n[새벽기도회 - 성결홀]\n- 월~토, 오전 5시\n\n[아침예배 - 대예배실]\n- 월~토, 오전 6시 30분\n\n[금요일밤 기도회 - 대예배실]\n- 매주 금요일 저녁 8시 10분\n\n[목요 직장인예배 - 언더우드홀]\n- 매주 목요일 낮 12시 10분\n\n[화요 가족기도회 - 언더우드홀]\n- 매주 화요일 오전 10시 30분\n\n감사합니다.\n","imgList":[]},"live":{"isLive":"Y","playUrl":"www.youtube.com/watch?v=GoXPbGQl-uQ"},"promotion":{"type":"IMG","data":[{"imgUrl":"http://10.10.113.26:7071/public/static/images/cjhv/homepromo/2d698809-8eb2-4ce6-b856-18319ebe098d.png"}]}}
      // {"clubId":"C2103091250002C","clubName":"양천교회","chnlNo":110,"join":{"joinType":"100","introImg":"http://10.10.113.26:7071/public/static/images/cjhv/homeintro/f6254dd9-c96d-4014-b5b5-0f1868ef3d8d.jpg","introText":"가입하세요"},"menuList":[{"type":"NOTICE","title":"공지 사항"},{"type":"CONT","title":"콘텐츠 목록"},{"type":"LIVE","title":"라이브 방송"}],"notice":{"id":24,"title":"공지 03_중요_텍스트이미지_봉사활동","date":"20210310190839","type":"TXTIMG","text":"텍스트이미지형엔터1\n텍스트이미지형엔터2\n텍스트이미지형엔터3\n","imgList":[{"imgUrl":"http://10.10.113.26:7071/public/static/images/cjhv/notice/85bd1bc0-f3a6-4ae6-b271-a45e4123ff69.jpg"}]},"live":{"isLive":"Y","playUrl":"www.youtube.com/watch?v=rtw_P1sWkBI"},"promotion":{"type":"IMG","data":[{"imgUrl":"http://10.10.113.26:7071/public/static/images/cjhv/homepromo/fbea5a21-2d49-4622-ba46-1390526f18b9.jpeg"},{"imgUrl":"http://10.10.113.26:7071/public/static/images/cjhv/homepromo/a49c98b6-a42c-402a-8406-7f13c0e4ac1b.jpg"}]}}
    ];
  });

  mock.onGet(new RegExp("/uipf/v1/club/account/withdraw")).reply((config) => {
    return [200, { result: "0000" }];
  });

  mock.onGet("/v1/club/account/auth").reply((config) => {
    return [200, { result: "0000" }];
  });

  mock.onGet(new RegExp("/v1/club/account/join")).reply((config) => {
    return [200, { result: "0000" }];
  });

  mock.onGet(new RegExp("/uipf/v1/club/agree/list")).reply((config) => {
    return [200,
      // { C0201: "약관1", C0202: "약관2" } 
      {"C0201":"(필수) 개인정보 수집 동의\nLG헬로비전은 헬로클럽 서비스 제공을 위하여 필요 최소한의 개인정보를 수집하고 있습니다.\n- 수집 및 이용 목적 : 헬로클럽 서비스 제공\n- 수집 항목 : 헬로tv 가입 시, 기재된 고객정보 중 이름\n- 보유 기간 : 본 헬로클럽 가입 기간 동안 (탈퇴 시, 즉시 파기)\n동의를 거부할 수 있으나, 동의 거부 시 헬로클럽 서비스 이용이 불가 합니다.","C0202":"(필수) 개인정보 제 3자 제공 동의\nLG헬로비전은 고객님의 별도 동의를 얻은 경우 또는 법령에서 제공하도록 하는 경우를 제외하고는 이용자의 개인정보를 외부에 제공하지 않습니다.\n- 제공받는 자(제3자) : 양천교회\n- 제공하는 목적 : 양천교회 콘텐츠 제공\n- 제공하는 개인정보 항목 : 헬로tv 가입 시, 기재된 고객정보 중 이름\n동의를 거부할 수 있으나, 동의 거부 시 헬로클럽 서비스 이용이 불가 합니다."}
    ];
  });

  mock.onGet(new RegExp("/clubpf/svc/notice/list")).reply((config) => {
    const request = config.params as NoticeListRequest;
    return [
      200,
      // { topNotice: { id: 9999, title: `최상단 고정 공지사항 (categoryId: ${request.cateId})`, text: "이번 주 예배 안내입니다<br /><br />우리교회 본당은 450석이므로 주일 예배를 45명씩 4부로 나누어예배를 드릴 예정입니다. 대면 예배에 참여하시기 원하시는 분은아래 예배 안내를 참고해주시기 바랍니다.<br /><br />기저질환을 가지고 계시거나, 평상시 사람을 많이 만나시는 분들은실시간으로 진행되는 영상을 통해 예배를 드려주시기 바라며,코로나가 속히 종식이 되기를 함께 기도해주시기 바랍니다.<br /><br />상암교회 김봉수 목사 * 예배 안내 (실시간 온라인 예배)<br />주일 1부 예배 : 오전 8시 (1~6구역)<br />주일 2부 예배 : 오전 9시 30분 (7~12구역)<br />주일 3부 예배 : 오전 11시 (13~18구역)<br />주일 4부 예배 : 오후 12시 30분 (19~27구역)<br /><br />* 헌금 계좌 안내<br />[십일조, 감사, 주정, 선교헌금]<br />국민 598601-04-137958 (대한예수교장로회 상암교회)<br />[건축헌금]<br />농협 351-0090-3647-43 (상암교회)<br />", date: "2021.01.01", type: "TXT", }, total: notices.length, data: notices.slice(request.offset, request.offset + request.limit) }
      {"total":2,"data":[{"id":42,"title":"운산 성결교회 예배 안내 드립니다.","date":"20210310131331","type":"TXT","text":"안녕하세요.\n운산 성결교회 예배 안내 드립니다.\n\n[주일예배 - 대예배실]\n- 1부 : 오전 7시 30분\n- 2부 : 오전 9시\n- 3부 : 오전 11시\n- 4부 : 오후 1시\n- 5부 : 오후 2시 30분\n\n[주일 오후 찬양예배 - 대예배실]\n- 매주 주일 오후 5시 \n\n[수요예배 - 대예배실]\n- 매주 수요일 저녁 7시\n\n[새벽기도회 - 성결홀]\n- 월~토, 오전 5시\n\n[아침예배 - 대예배실]\n- 월~토, 오전 6시 30분\n\n[금요일밤 기도회 - 대예배실]\n- 매주 금요일 저녁 8시 10분\n\n[목요 직장인예배 - 언더우드홀]\n- 매주 목요일 낮 12시 10분\n\n[화요 가족기도회 - 언더우드홀]\n- 매주 화요일 오전 10시 30분\n\n감사합니다.\n","imgList":[]},{"id":41,"title":"3월 주일예배 일정 안내","date":"20210310112046","type":"TXT","text":"3월 주일예배 일정 안내\n\n3월 7일, 11시 봉사활동 진행\n3월 9일, 12시 홍보활동 진행","imgList":[]}],"topNotice":[{"id":41,"title":"3월 주일예배 일정 안내","date":"20210310112046","type":"TXT","text":"3월 주일예배 일정 안내\n\n3월 7일, 11시 봉사활동 진행\n3월 9일, 12시 홍보활동 진행","imgList":[]},{"id":42,"title":"운산 성결교회 예배 안내 드립니다.","date":"20210310131331","type":"TXT","text":"안녕하세요.\n운산 성결교회 예배 안내 드립니다.\n\n[주일예배 - 대예배실]\n- 1부 : 오전 7시 30분\n- 2부 : 오전 9시\n- 3부 : 오전 11시\n- 4부 : 오후 1시\n- 5부 : 오후 2시 30분\n\n[주일 오후 찬양예배 - 대예배실]\n- 매주 주일 오후 5시 \n\n[수요예배 - 대예배실]\n- 매주 수요일 저녁 7시\n\n[새벽기도회 - 성결홀]\n- 월~토, 오전 5시\n\n[아침예배 - 대예배실]\n- 월~토, 오전 6시 30분\n\n[금요일밤 기도회 - 대예배실]\n- 매주 금요일 저녁 8시 10분\n\n[목요 직장인예배 - 언더우드홀]\n- 매주 목요일 낮 12시 10분\n\n[화요 가족기도회 - 언더우드홀]\n- 매주 화요일 오전 10시 30분\n\n감사합니다.\n","imgList":[]}]}
    ];
  });

  mock.onGet(new RegExp("/clubpf/svc/notice/cateList")).reply((config) => {
    return [
      200,
      // { total: 2, data: [ { cateId: "1", cateName: "공지사항1" }, { cateId: "2", cateName: "공지사항2" }, ], }
      {"total":2,"data":[{"cateId":"C21031003D","cateName":"공지사항"},{"cateId":"C21031003E","cateName":"교회 시설 이용 안내"}]}
    ];
  });

  mock.onGet(new RegExp("/uipf/v1/club/account/isJoin")).reply((config) => {
    return [200, {
      result: true // true-가입됨, false-미가입
    }]
  });

  mock.onGet(new RegExp("/clubpf/svc/dca/valid")).reply((config) => {
    return [200, {
      result: true, // true-개별 클럽 홈, false-클럽 리스트
      chnlNo: 123,
      clubId: "1231231"
    }]
  });
}