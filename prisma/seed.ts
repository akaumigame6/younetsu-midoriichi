import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // PrismaClientのインスタンス生成

const main = async () => {
  // 既存データの削除（外部キー制約エラーを避けるため、子テーブルから順番に削除）
  await prisma.feedbackRecord.deleteMany();
  await prisma.surveyRecord.deleteMany();
  await prisma.event_Creator.deleteMany();
  await prisma.event.deleteMany();
  await prisma.creator.deleteMany();




  // 2. Event (イベント) の作成
  const event = await prisma.event.create({
    data: {
      title: "みどりの市 2026 夏",
      description: "手作りの作品が集まるクラフトマーケット",
      date: new Date("2026-08-15T10:00:00Z"),
      location: "みどり公園 特設会場",
      eventQ2Placeholder: "例：〇〇の展示で、入り口の雰囲気から",
      eventQ3Placeholder: "例：色使いがとても綺麗だったから",
      freeEventPlaceholder: "例：素晴らしい体験でした。特に〇〇が印象に残りました。",
      creatorQ2Placeholder: "例：作品の〇〇の表現から",
      creatorQ3Placeholder: "例：不思議な魅力があったから",
      freeCreatorPlaceholder: "例：素晴らしい体験でした。特に〇〇が印象に残りました。",
      referralSources: "SNS（X, Instagram等）,友人・知人の紹介,ポスター・チラシ,その他",
    },
  });

  // 3. Creator (作家) の作成
  const creatorA = await prisma.creator.create({
    data: {
      name: "ガラス工房A",
      description: "手吹きのガラスアクセサリーを作っています。",
      iconUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=A",
    },
  });

  const creatorB = await prisma.creator.create({
    data: {
      name: "木工職人B",
      description: "自然の温もりを感じる木のうつわを製作しています。",
      iconUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=B",
    },
  });

  // 4. Event_Creator (イベントと作家の紐付け)
  await prisma.event_Creator.createMany({
    data: [
      { eventId: event.id, creatorId: creatorA.id },
      { eventId: event.id, creatorId: creatorB.id },
    ],
  });

  // 5. SurveyRecord (イベント全体アンケート) の作成
  const survey = await prisma.surveyRecord.create({
    data: {
      eventId: event.id,
      inputType: "questions",
      q1: ["ワクワク", "感動"],
      q2: "会場の入り口付近",
      q3: "雰囲気が明るかったため",
      referralSources: ["SNSを見て"],
      content: "会場の入り口付近の雰囲気が明るかった為、とても楽しかったです。次回も参加したいです。",
    },
  });

  // 6. FeedbackRecord (作家への感想) の作成
  await prisma.feedbackRecord.create({
    data: {
      creatorId: creatorA.id,
      surveyRecordId: survey.id,
      inputType: "free",
      content: "ガラスの色合いがとても綺麗で一目惚れしました！",
    },
  });

  await prisma.feedbackRecord.create({
    data: {
      creatorId: creatorB.id,
      surveyRecordId: survey.id,
      inputType: "questions",
      q1: ["感動", "癒し"],
      q2: "お皿を手に取った時",
      q3: "なめらかな手触りだったから",
      content: "お皿を手に取った時のなめらかな手触りに感動しました。次回もぜひ購入したいです。",
    },
  });
  console.log("Seeding finished.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });