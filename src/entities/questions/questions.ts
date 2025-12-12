export type Lang = 'ru' | 'en';

export type Question = {
  id: number; // 1..40
  section:
    | 'origins'
    | 'choices'
    | 'relationships'
    | 'conflict'
    | 'values'
    | 'time'
    | 'world'
    | 'integration';
  title: { ru: string; en: string };
  subtitle: { ru: string; en: string };
  text: { ru: string; en: string };
};

export const QUESTIONS: Question[] = [
  // I. Истоки (1–5)
  {
    id: 1,
    section: 'origins',
    title: { ru: 'Истоки', en: 'Origins' },
    subtitle: { ru: 'Вопрос I', en: 'Question I' },
    text: {
      ru: 'В какой момент вашей жизни вы впервые почувствовали: “Я — это я”? Что тогда произошло?',
      en: 'When did you first feel “I am me”? What happened at that moment?',
    },
  },
  {
    id: 2,
    section: 'origins',
    title: { ru: 'Детство', en: 'Childhood' },
    subtitle: { ru: 'Вопрос II', en: 'Question II' },
    text: {
      ru: 'Какая сцена из детства до сих пор влияет на вас — даже если вы редко о ней думаете?',
      en: 'Which childhood scene still influences you, even if you rarely think about it?',
    },
  },
  {
    id: 3,
    section: 'origins',
    title: { ru: 'Свобода', en: 'Freedom' },
    subtitle: { ru: 'Вопрос III', en: 'Question III' },
    text: {
      ru: 'Когда вы ощущаете свободу телом, а не мыслью? Опишите конкретный эпизод.',
      en: 'When do you feel freedom in your body, not just as an idea? Describe a specific moment.',
    },
  },
  {
    id: 4,
    section: 'origins',
    title: { ru: 'Раны и защита', en: 'Wounds & Protection' },
    subtitle: { ru: 'Вопрос IV', en: 'Question IV' },
    text: {
      ru: 'Какую “защиту” вы научились носить, чтобы выживать среди людей? Как она помогает и чем мешает?',
      en: 'What “armor” did you learn to wear among people? How does it help, and how does it limit you?',
    },
  },
  {
    id: 5,
    section: 'origins',
    title: { ru: 'Таланты', en: 'Gifts' },
    subtitle: { ru: 'Вопрос V', en: 'Question V' },
    text: {
      ru: 'Что у вас получалось почти без усилий — и как вы этим распоряжались?',
      en: 'What came easily to you—and what did you do with it?',
    },
  },

  // II. Выборы (6–10)
  {
    id: 6,
    section: 'choices',
    title: { ru: 'Поворот', en: 'Turning Point' },
    subtitle: { ru: 'Вопрос VI', en: 'Question VI' },
    text: {
      ru: 'Какое решение изменило вашу жизнь сильнее всего? Что вы поставили на карту?',
      en: 'Which decision changed your life the most? What was at stake?',
    },
  },
  {
    id: 7,
    section: 'choices',
    title: { ru: 'Цена', en: 'The Price' },
    subtitle: { ru: 'Вопрос VII', en: 'Question VII' },
    text: {
      ru: 'За что вы уже заплатили в этой жизни — и считаете ли цену справедливой?',
      en: 'What have you already paid for in life—and do you consider the price fair?',
    },
  },
  {
    id: 8,
    section: 'choices',
    title: { ru: 'Упущенное', en: 'The Unchosen' },
    subtitle: { ru: 'Вопрос VIII', en: 'Question VIII' },
    text: {
      ru: 'Какой путь вы не выбрали, но иногда мысленно к нему возвращаетесь? Почему?',
      en: 'Which path did you not choose, yet sometimes return to in your mind? Why?',
    },
  },
  {
    id: 9,
    section: 'choices',
    title: { ru: 'Смелость', en: 'Courage' },
    subtitle: { ru: 'Вопрос IX', en: 'Question IX' },
    text: {
      ru: 'Когда вы были смелее всего — и что именно тогда поддерживало вас изнутри?',
      en: 'When were you the bravest—and what supported you from within?',
    },
  },
  {
    id: 10,
    section: 'choices',
    title: { ru: 'Компас', en: 'Compass' },
    subtitle: { ru: 'Вопрос X', en: 'Question X' },
    text: {
      ru: 'Как вы понимаете, что решение “ваше”? По каким признакам вы это узнаёте?',
      en: 'How do you know a decision is truly yours? What signs tell you?',
    },
  },

  // III. Отношения (11–15)
  {
    id: 11,
    section: 'relationships',
    title: { ru: 'Близость', en: 'Intimacy' },
    subtitle: { ru: 'Вопрос XI', en: 'Question XI' },
    text: {
      ru: 'Что для вас настоящая близость? Что обязательно должно быть, чтобы вы открылись?',
      en: 'What is real intimacy for you? What must be present for you to open up?',
    },
  },
  {
    id: 12,
    section: 'relationships',
    title: { ru: 'Любовь', en: 'Love' },
    subtitle: { ru: 'Вопрос XII', en: 'Question XII' },
    text: {
      ru: 'За что вас было трудно любить — и за что вас всё-таки любили?',
      en: 'What makes you difficult to love—and what do people love you for anyway?',
    },
  },
  {
    id: 13,
    section: 'relationships',
    title: { ru: 'Одиночество', en: 'Solitude' },
    subtitle: { ru: 'Вопрос XIII', en: 'Question XIII' },
    text: {
      ru: 'Каким бывает ваше одиночество: исцеляющим или разрушающим? От чего это зависит?',
      en: 'Is your solitude healing or destructive? What does it depend on?',
    },
  },
  {
    id: 14,
    section: 'relationships',
    title: { ru: 'Доверие', en: 'Trust' },
    subtitle: { ru: 'Вопрос XIV', en: 'Question XIV' },
    text: {
      ru: 'Что для вас значит доверять? И что чаще всего мешает вам доверять людям?',
      en: 'What does it mean for you to trust? What most often prevents you from trusting people?',
    },
  },
  {
    id: 15,
    section: 'relationships',
    title: { ru: 'Прощание', en: 'Goodbyes' },
    subtitle: { ru: 'Вопрос XV', en: 'Question XV' },
    text: {
      ru: 'С кем или с чем вам пришлось попрощаться — и чему вас это научило?',
      en: 'What or whom did you have to say goodbye to—and what did it teach you?',
    },
  },

  // IV. Внутренний конфликт (16–20)
  {
    id: 16,
    section: 'conflict',
    title: { ru: 'Сомнение', en: 'Doubt' },
    subtitle: { ru: 'Вопрос XVI', en: 'Question XVI' },
    text: {
      ru: 'В каких ситуациях вы чаще всего сомневаетесь в себе? Как вы с этим справляетесь?',
      en: 'In which situations do you doubt yourself most? How do you deal with it?',
    },
  },
  {
    id: 17,
    section: 'conflict',
    title: { ru: 'Страх', en: 'Fear' },
    subtitle: { ru: 'Вопрос XVII', en: 'Question XVII' },
    text: {
      ru: 'Какой страх управляет вами скрытно? Что он пытается защитить?',
      en: 'Which fear quietly controls you? What is it trying to protect?',
    },
  },
  {
    id: 18,
    section: 'conflict',
    title: { ru: 'Гнев', en: 'Anger' },
    subtitle: { ru: 'Вопрос XVIII', en: 'Question XVIII' },
    text: {
      ru: 'Когда вы злитесь по-настоящему? Что в эти моменты для вас является нарушением?',
      en: 'When do you feel true anger? What boundary is being violated in those moments?',
    },
  },
  {
    id: 19,
    section: 'conflict',
    title: { ru: 'Тень', en: 'Shadow' },
    subtitle: { ru: 'Вопрос XIX', en: 'Question XIX' },
    text: {
      ru: 'Что вы в себе не любите признавать? Как это проявляется в жизни?',
      en: 'What do you dislike admitting about yourself? How does it show up in your life?',
    },
  },
  {
    id: 20,
    section: 'conflict',
    title: { ru: 'Усталость', en: 'Fatigue' },
    subtitle: { ru: 'Вопрос XX', en: 'Question XX' },
    text: {
      ru: 'От чего вы устаете сильнее всего — от дел, людей, ожиданий или внутренней борьбы?',
      en: 'What exhausts you the most—tasks, people, expectations, or inner struggle?',
    },
  },

  // V. Смысл и ценности (21–25)
  {
    id: 21,
    section: 'values',
    title: { ru: 'Ценности', en: 'Values' },
    subtitle: { ru: 'Вопрос XXI', en: 'Question XXI' },
    text: {
      ru: 'Что вы считаете по-настоящему важным — даже если это невыгодно и не модно?',
      en: 'What do you consider truly important—even if it is unprofitable or unfashionable?',
    },
  },
  {
    id: 22,
    section: 'values',
    title: { ru: 'Смысл', en: 'Meaning' },
    subtitle: { ru: 'Вопрос XXII', en: 'Question XXII' },
    text: {
      ru: 'Что придает вашей жизни смысл в обычные дни, без “великих событий”?',
      en: 'What gives your life meaning on ordinary days, without “big events”?',
    },
  },
  {
    id: 23,
    section: 'values',
    title: { ru: 'Совесть', en: 'Conscience' },
    subtitle: { ru: 'Вопрос XXIII', en: 'Question XXIII' },
    text: {
      ru: 'Где проходит ваша внутренняя граница: что вы не сделаете ни при каких обстоятельствах?',
      en: 'Where is your inner line—what will you not do under any circumstances?',
    },
  },
  {
    id: 24,
    section: 'values',
    title: { ru: 'Гордость', en: 'Pride' },
    subtitle: { ru: 'Вопрос XXIV', en: 'Question XXIV' },
    text: {
      ru: 'За что вы уважаете себя? Приведите пример, который нельзя “отнять”.',
      en: 'What do you respect yourself for? Give an example that cannot be “taken away.”',
    },
  },
  {
    id: 25,
    section: 'values',
    title: { ru: 'Иллюзии', en: 'Illusions' },
    subtitle: { ru: 'Вопрос XXV', en: 'Question XXV' },
    text: {
      ru: 'Во что вы верили раньше, а потом разочаровались? Что вы вынесли из этого?',
      en: 'What did you used to believe in, then became disillusioned with? What did you take from it?',
    },
  },

  // VI. Время и смертность (26–30)
  {
    id: 26,
    section: 'time',
    title: { ru: 'Время', en: 'Time' },
    subtitle: { ru: 'Вопрос XXVI', en: 'Question XXVI' },
    text: {
      ru: 'Как вы чувствуете время: оно течет быстро, медленно, рвется, давит? Когда это меняется?',
      en: 'How do you feel time—fast, slow, broken, heavy? When does it change?',
    },
  },
  {
    id: 27,
    section: 'time',
    title: { ru: 'Память', en: 'Memory' },
    subtitle: { ru: 'Вопрос XXVII', en: 'Question XXVII' },
    text: {
      ru: 'Какие три воспоминания вы бы сохранили навсегда, если бы пришлось выбрать только три?',
      en: 'Which three memories would you keep forever if you had to choose only three?',
    },
  },
  {
    id: 28,
    section: 'time',
    title: { ru: 'Смертность', en: 'Mortality' },
    subtitle: { ru: 'Вопрос XXVIII', en: 'Question XXVIII' },
    text: {
      ru: 'Как мысль о смерти влияет на ваш выбор: пугает, подталкивает, делает яснее?',
      en: 'How does the thought of death affect your choices—fear, push, clarity?',
    },
  },
  {
    id: 29,
    section: 'time',
    title: { ru: 'След', en: 'Legacy' },
    subtitle: { ru: 'Вопрос XXIX', en: 'Question XXIX' },
    text: {
      ru: 'Какой след вы хотите оставить: в людях, в делах, в мире? Что для вас “след” вообще?',
      en: 'What legacy do you want to leave—in people, in work, in the world? What is “legacy” to you?',
    },
  },
  {
    id: 30,
    section: 'time',
    title: { ru: 'Незавершенность', en: 'Unfinished' },
    subtitle: { ru: 'Вопрос XXX', en: 'Question XXX' },
    text: {
      ru: 'Что вы чувствуете незавершённым — и почему это для вас важно завершить (или отпустить)?',
      en: 'What feels unfinished—and why is it important to finish it (or let it go)?',
    },
  },

  // VII. Я и мир (31–35)
  {
    id: 31,
    section: 'world',
    title: { ru: 'Ответственность', en: 'Responsibility' },
    subtitle: { ru: 'Вопрос XXXI', en: 'Question XXXI' },
    text: {
      ru: 'За что вы готовы отвечать полностью — без оправданий и объяснений?',
      en: 'What are you willing to take full responsibility for—without excuses or explanations?',
    },
  },
  {
    id: 32,
    section: 'world',
    title: { ru: 'Справедливость', en: 'Justice' },
    subtitle: { ru: 'Вопрос XXXII', en: 'Question XXXII' },
    text: {
      ru: 'Что для вас справедливость? Была ли ситуация, когда вы выбрали справедливость вместо выгоды?',
      en: 'What is justice to you? Was there a time you chose justice over advantage?',
    },
  },
  {
    id: 33,
    section: 'world',
    title: { ru: 'Власть и свобода', en: 'Power & Freedom' },
    subtitle: { ru: 'Вопрос XXXIII', en: 'Question XXXIII' },
    text: {
      ru: 'Где в вашей жизни больше власти: у вас или у обстоятельств? Что бы вы изменили?',
      en: 'In your life, who has more power—you or circumstances? What would you change?',
    },
  },
  {
    id: 34,
    section: 'world',
    title: { ru: 'Мир людей', en: 'Human World' },
    subtitle: { ru: 'Вопрос XXXIV', en: 'Question XXXIV' },
    text: {
      ru: 'Какая часть “мира людей” вам чужда, а какая — близка? Почему?',
      en: 'Which part of the “human world” feels alien to you, and which feels close? Why?',
    },
  },
  {
    id: 35,
    section: 'world',
    title: { ru: 'Служение', en: 'Service' },
    subtitle: { ru: 'Вопрос XXXV', en: 'Question XXXV' },
    text: {
      ru: 'Кому или чему вы готовы служить — не из страха и не из долга, а по смыслу?',
      en: 'Whom or what are you willing to serve—not from fear or duty, but from meaning?',
    },
  },

  // VIII. Итог и интеграция (36–40)
  {
    id: 36,
    section: 'integration',
    title: { ru: 'Принятие', en: 'Acceptance' },
    subtitle: { ru: 'Вопрос XXXVI', en: 'Question XXXVI' },
    text: {
      ru: 'Что в себе вы уже приняли — и что всё ещё пытаетесь исправить любой ценой?',
      en: 'What have you accepted in yourself—and what are you still trying to “fix” at any cost?',
    },
  },
  {
    id: 37,
    section: 'integration',
    title: { ru: 'Истина', en: 'Truth' },
    subtitle: { ru: 'Вопрос XXXVII', en: 'Question XXXVII' },
    text: {
      ru: 'Какую правду о себе вы знаете, но редко говорите вслух — даже себе?',
      en: 'What truth about yourself do you know, but rarely say out loud—even to yourself?',
    },
  },
  {
    id: 38,
    section: 'integration',
    title: { ru: 'Прощение', en: 'Forgiveness' },
    subtitle: { ru: 'Вопрос XXXVIII', en: 'Question XXXVIII' },
    text: {
      ru: 'Кого (или себя) вам важнее всего простить — и что мешает это сделать?',
      en: 'Whom (or yourself) do you most need to forgive—and what prevents it?',
    },
  },
  {
    id: 39,
    section: 'integration',
    title: { ru: 'Жизнь дальше', en: 'Life Forward' },
    subtitle: { ru: 'Вопрос XXXIX', en: 'Question XXXIX' },
    text: {
      ru: 'Если бы вы могли прожить следующий год “честнее”, что бы изменили в первую очередь?',
      en: 'If you could live the next year more honestly, what would you change first?',
    },
  },
  {
    id: 40,
    section: 'integration',
    title: { ru: 'Формула', en: 'Your Formula' },
    subtitle: { ru: 'Вопрос XL', en: 'Question XL' },
    text: {
      ru: 'Сформулируйте вашу текущую “формулу жизни” в 3–7 строках: что главное, что вторично, что больше не нужно.',
      en: 'Write your current “life formula” in 3–7 lines: what is primary, what is secondary, what is no longer needed.',
    },
  },
];
