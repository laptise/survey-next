export interface MainPageScript {
  pageTitle: string;
  titleDesc: string;
  addNewSectionTitle: string;
  addNewSectionDesc: string;
  addNewSectionRegistButtonLabel: string;
  howtoSectionTitle: string;
  howtoSectionDesc: string;
  devSectionTitle: string;
  devSectionDesc: string;
  devSectionButtonLabel: string;
  featuresSectionTitle: string;
  featuresSectionDesc: string;
  featuresSectionButtonLabel: string;
}

const mainPageScripts: MainPageScript[] = [
  {
    pageTitle: "ホーム",
    titleDesc: "アンケート",
    addNewSectionTitle: "手軽な作成と公開",
    addNewSectionDesc: "必要なアンケート項目を作成すればリンクが作られます。 リンクを共有し、応答を待つだけで完了します。",
    addNewSectionRegistButtonLabel: "新しいアンケートを作成する",
    howtoSectionTitle: "直観的なアンケート作成",
    howtoSectionDesc: "直観的でわかりやすい方法でアンケートを作成できます。",
    devSectionTitle: "サンプルアンケート",
    devSectionDesc: "サンプルを見る",
    devSectionButtonLabel: "サンプルを見に行く",
    featuresSectionTitle: "パワーフルな機能",
    featuresSectionDesc: "メールで結果を受けとる, CSV出力, 使い捨てリンク発行, 結果分析など、有用な機能を提供します。",
    featuresSectionButtonLabel: "もっと見る",
  },
  {
    pageTitle: "홈",
    titleDesc: "설문조사",
    addNewSectionTitle: "간편한 작성과 배포",
    addNewSectionDesc: "필요한 설문 항목을 작성하면 링크가 생성됩니다. 링크를 배포하고 응답자들의 제출을 기다리기만 하면 됩니다.",
    addNewSectionRegistButtonLabel: "새로운 설문 등록하기",
    howtoSectionTitle: "직관적인 문제지 작성",
    howtoSectionDesc: "직관적이고 알기 쉬운 방법으로 설문을 작성할 수 있습니다.",
    devSectionTitle: "테스트 설문",
    devSectionDesc: "샘플 보기 (GET REQUEST)",
    devSectionButtonLabel: "샘플 보러가기",
    featuresSectionTitle: "강력한 기능",
    featuresSectionDesc: "메일로 결과 제출받기, CSV출력, 1회성 링크 발행, 결과분석 등 유용한 기능을 지원합니다.",
    featuresSectionButtonLabel: "더보기",
  },
];

export default mainPageScripts;
