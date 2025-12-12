export type Lang = 'ru' | 'en';

export type Question = {
  id: number;
  title: { ru: string; en: string };
  subtitle: { ru: string; en: string };
  text: { ru: string; en: string };
};

export const QUESTIONS: Question[] = [
  { id: 1, title: { ru: 'Истоки', en: 'Origins' }, subtitle: { ru: 'Вопрос I', en: 'Question I' }, text: { ru: 'В какой момент вы впервые почувствовали: «Я — это я»? Что тогда произошло?', en: 'When did you first feel “I am me”? What happened then?' } },
  { id: 2, title: { ru: 'Детство', en: 'Childhood' }, subtitle: { ru: 'Вопрос II', en: 'Question II' }, text: { ru: 'Какая сцена из детства до сих пор влияет на вас, даже если вы редко о ней думаете?', en: 'Which childhood scene still influences you, even if you rarely think about it?' } },
  { id: 3, title: { ru: 'Свобода', en: 'Freedom' }, subtitle: { ru: 'Вопрос III', en: 'Question III' }, text: { ru: 'Когда вы чувствуете свободу телом, а не только мыслью? Опишите эпизод.', en: 'When do you feel freedom in your body, not just as an idea? Describe a moment.' } },
  { id: 4, title: { ru: 'Защита', en: 'Armor' }, subtitle: { ru: 'Вопрос IV', en: 'Question IV' }, text: { ru: 'Какую “защиту” вы научились носить среди людей? Чем она помогает и чем мешает?', en: 'What “armor” did you learn to wear among people? How does it help and limit you?' } },
  { id: 5, title: { ru: 'Дар', en: 'Gift' }, subtitle: { ru: 'Вопрос V', en: 'Question V' }, text: { ru: 'Что у вас получалось почти без усилий — и как вы этим распорядились?', en: 'What came easily to you—and what did you do with it?' } },

  { id: 6, title: { ru: 'Поворот', en: 'Turning Point' }, subtitle: { ru: 'Вопрос VI', en: 'Question VI' }, text: { ru: 'Какое решение изменило вашу жизнь сильнее всего? Что вы поставили на карту?', en: 'Which decision changed your life the most? What was at stake?' } },
  { id: 7, title: { ru: 'Цена', en: 'The Price' }, subtitle: { ru: 'Вопрос VII', en: 'Question VII' }, text: { ru: 'За что вы уже заплатили в этой жизни — и считаете ли цену справедливой?', en: 'What have you already paid for in life—and do you consider the price fair?' } },
  { id: 8, title: { ru: 'Не выбранное', en: 'The Unchosen' }, subtitle: { ru: 'Вопрос VIII', en: 'Question VIII' }, text: { ru: 'Какой путь вы не выбрали, но иногда к нему возвращаетесь мысленно? Почему?', en: 'Which path did you not choose, yet sometimes return to in your mind? Why?' } },
  { id: 9, title: { ru: 'Смелость', en: 'Courage' }, subtitle: { ru: 'Вопрос IX', en: 'Question IX' }, text: { ru: 'Когда вы были смелее всего — и что поддерживало вас изнутри?', en: 'When were you the bravest—and what supported you from within?' } },
  { id: 10, title: { ru: 'Компас', en: 'Compass' }, subtitle: { ru: 'Вопрос X', en: 'Question X' }, text: { ru: 'Как вы понимаете, что решение “ваше”? По каким признакам вы это узнаёте?', en: 'How do you know a decision is truly yours? What signs tell you?' } },

  { id: 11, title: { ru: 'Близость', en: 'Intimacy' }, subtitle: { ru: 'Вопрос XI', en: 'Question XI' }, text: { ru: 'Что для вас настоящая близость? Что должно быть, чтобы вы открылись?', en: 'What is real intimacy for you? What must be present for you to open up?' } },
  { id: 12, title: { ru: 'Любовь', en: 'Love' }, subtitle: { ru: 'Вопрос XII', en: 'Question XII' }, text: { ru: 'За что вас трудно любить — и за что вас всё-таки любят?', en: 'What makes you difficult to love—and what do people love you for anyway?' } },
  { id: 13, title: { ru: 'Одиночество', en: 'Solitude' }, subtitle: { ru: 'Вопрос XIII', en: 'Question XIII' }, text: { ru: 'Ваше одиночество чаще исцеляет или разрушает? От чего это зависит?', en: 'Is your solitude more healing or destructive? What does it depend on?' } },
  { id: 14, title: { ru: 'Доверие', en: 'Trust' }, subtitle: { ru: 'Вопрос XIV', en: 'Question XIV' }, text: { ru: 'Что мешает вам доверять людям — и что помогает доверять?', en: 'What prevents you from trusting people—and what helps you trust?' } },
  { id: 15, title: { ru: 'Прощание', en: 'Goodbyes' }, subtitle: { ru: 'Вопрос XV', en: 'Question XV' }, text: { ru: 'С кем или с чем вам пришлось попрощаться — и чему это научило?', en: 'What or whom did you have to say goodbye to—and what did it teach you?' } },

  { id: 16, title: { ru: 'Сомнение', en: 'Doubt' }, subtitle: { ru: 'Вопрос XVI', en: 'Question XVI' }, text: { ru: 'В каких ситуациях вы чаще сомневаетесь в себе? Как вы выходите из этого?', en: 'When do you doubt yourself most? How do you get through it?' } },
  { id: 17, title: { ru: 'Страх', en: 'Fear' }, subtitle: { ru: 'Вопрос XVII', en: 'Question XVII' }, text: { ru: 'Какой страх управляет вами скрытно? Что он пытается защитить?', en: 'Which fear quietly controls you? What is it trying to protect?' } },
  { id: 18, title: { ru: 'Гнев', en: 'Anger' }, subtitle: { ru: 'Вопрос XVIII', en: 'Question XVIII' }, text: { ru: 'Когда вы злитесь по-настоящему? Какая граница в эти моменты нарушается?', en: 'When do you feel true anger? Which boundary is being violated?' } },
  { id: 19, title: { ru: 'Тень', en: 'Shadow' }, subtitle: { ru: 'Вопрос XIX', en: 'Question XIX' }, text: { ru: 'Что вы в себе не любите признавать? Как это проявляется в жизни?', en: 'What do you dislike admitting about yourself? How does it show up?' } },
  { id: 20, title: { ru: 'Усталость', en: 'Fatigue' }, subtitle: { ru: 'Вопрос XX', en: 'Question XX' }, text: { ru: 'Что сильнее всего вас истощает: дела, люди, ожидания или внутренняя борьба?', en: 'What exhausts you most—tasks, people, expectations, or inner struggle?' } },

  { id: 21, title: { ru: 'Ценности', en: 'Values' }, subtitle: { ru: 'Вопрос XXI', en: 'Question XXI' }, text: { ru: 'Что для вас по-настоящему важно — даже если это невыгодно и не модно?', en: 'What is truly important to you—even if it’s not profitable or fashionable?' } },
  { id: 22, title: { ru: 'Смысл', en: 'Meaning' }, subtitle: { ru: 'Вопрос XXII', en: 'Question XXII' }, text: { ru: 'Что даёт смысл вашим обычным дням без “великих событий”?', en: 'What gives meaning to your ordinary days without “big events”?' } },
  { id: 23, title: { ru: 'Граница', en: 'Inner Line' }, subtitle: { ru: 'Вопрос XXIII', en: 'Question XXIII' }, text: { ru: 'Что вы не сделаете ни при каких обстоятельствах? Где ваша внутренняя граница?', en: 'What will you not do under any circumstances? Where is your inner line?' } },
  { id: 24, title: { ru: 'Уважение', en: 'Self-Respect' }, subtitle: { ru: 'Вопрос XXIV', en: 'Question XXIV' }, text: { ru: 'За что вы уважаете себя? Приведите пример, который нельзя “отнять”.', en: 'What do you respect yourself for? Give an example that can’t be “taken away.”' } },
  { id: 25, title: { ru: 'Иллюзии', en: 'Illusions' }, subtitle: { ru: 'Вопрос XXV', en: 'Question XXV' }, text: { ru: 'Во что вы верили, а потом разочаровались? Что это вам дало?', en: 'What did you believe in, then become disillusioned with? What did it give you?' } },

  { id: 26, title: { ru: 'Время', en: 'Time' }, subtitle: { ru: 'Вопрос XXVI', en: 'Question XXVI' }, text: { ru: 'Как вы чувствуете время: быстро, медленно, рвётся, давит? Когда это меняется?', en: 'How do you feel time—fast, slow, broken, heavy? When does it change?' } },
  { id: 27, title: { ru: 'Память', en: 'Memory' }, subtitle: { ru: 'Вопрос XXVII', en: 'Question XXVII' }, text: { ru: 'Какие три воспоминания вы бы сохранили навсегда, если бы можно было только три?', en: 'Which three memories would you keep forever if you could only keep three?' } },
  { id: 28, title: { ru: 'Смертность', en: 'Mortality' }, subtitle: { ru: 'Вопрос XXVIII', en: 'Question XXVIII' }, text: { ru: 'Как мысль о смерти влияет на ваш выбор: пугает, подталкивает, проясняет?', en: 'How does the thought of death affect your choices—fear, push, clarity?' } },
  { id: 29, title: { ru: 'След', en: 'Legacy' }, subtitle: { ru: 'Вопрос XXIX', en: 'Question XXIX' }, text: { ru: 'Какой след вы хотите оставить — в людях, делах, мире? Что для вас “след”?', en: 'What legacy do you want to leave—in people, work, the world? What is “legacy” to you?' } },
  { id: 30, title: { ru: 'Незавершённость', en: 'Unfinished' }, subtitle: { ru: 'Вопрос XXX', en: 'Question XXX' }, text: { ru: 'Что вы чувствуете незавершённым — и почему важно завершить (или отпустить)?', en: 'What feels unfinished—and why is it important to finish it (or let it go)?' } },

  { id: 31, title: { ru: 'Ответственность', en: 'Responsibility' }, subtitle: { ru: 'Вопрос XXXI', en: 'Question XXXI' }, text: { ru: 'За что вы готовы отвечать полностью — без оправданий?', en: 'What are you willing to take full responsibility for—without excuses?' } },
  { id: 32, title: { ru: 'Справедливость', en: 'Justice' }, subtitle: { ru: 'Вопрос XXXII', en: 'Question XXXII' }, text: { ru: 'Что для вас справедливость? Был ли момент, когда вы выбрали её вместо выгоды?', en: 'What is justice to you? Was there a moment you chose it over advantage?' } },
  { id: 33, title: { ru: 'Свобода/обстоятельства', en: 'Freedom/Circumstances' }, subtitle: { ru: 'Вопрос XXXIII', en: 'Question XXXIII' }, text: { ru: 'В вашей жизни больше власти у вас или у обстоятельств? Что бы вы изменили?', en: 'In your life, who has more power—you or circumstances? What would you change?' } },
  { id: 34, title: { ru: 'Мир людей', en: 'Human World' }, subtitle: { ru: 'Вопрос XXXIV', en: 'Question XXXIV' }, text: { ru: 'Какая часть “мира людей” вам чужда, а какая близка? Почему?', en: 'Which part of the “human world” feels alien to you, and which feels close? Why?' } },
  { id: 35, title: { ru: 'Служение', en: 'Service' }, subtitle: { ru: 'Вопрос XXXV', en: 'Question XXXV' }, text: { ru: 'Кому или чему вы готовы служить по смыслу — не из страха и не из долга?', en: 'Whom or what are you willing to serve from meaning—not from fear or duty?' } },

  { id: 36, title: { ru: 'Принятие', en: 'Acceptance' }, subtitle: { ru: 'Вопрос XXXVI', en: 'Question XXXVI' }, text: { ru: 'Что в себе вы уже приняли — а что всё ещё пытаетесь исправить любой ценой?', en: 'What have you accepted in yourself—and what are you still trying to fix at any cost?' } },
  { id: 37, title: { ru: 'Правда', en: 'Truth' }, subtitle: { ru: 'Вопрос XXXVII', en: 'Question XXXVII' }, text: { ru: 'Какую правду о себе вы знаете, но редко говорите вслух — даже себе?', en: 'What truth about yourself do you know, but rarely say out loud—even to yourself?' } },
  { id: 38, title: { ru: 'Прощение', en: 'Forgiveness' }, subtitle: { ru: 'Вопрос XXXVIII', en: 'Question XXXVIII' }, text: { ru: 'Кого важнее всего простить — и что мешает это сделать?', en: 'Whom do you most need to forgive—and what prevents it?' } },
  { id: 39, title: { ru: 'Честнее', en: 'More Honest' }, subtitle: { ru: 'Вопрос XXXIX', en: 'Question XXXIX' }, text: { ru: 'Если бы вы могли прожить следующий год честнее, что бы изменили в первую очередь?', en: 'If you could live the next year more honestly, what would you change first?' } },
  { id: 40, title: { ru: 'Формула', en: 'Your Formula' }, subtitle: { ru: 'Вопрос XL', en: 'Question XL' }, text: { ru: 'Сформулируйте вашу “формулу жизни” в 3–7 строках: главное, вторичное, лишнее.', en: 'Write your “life formula” in 3–7 lines: primary, secondary, unnecessary.' } },
];