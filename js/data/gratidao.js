window.PRACTICES = window.PRACTICES || {};
window.PRACTICES["gratidao"] = {
  // perguntas-guia da "coluna do dia" — giram a cada prática, para tirar
  // o peso do "não sei o que escrever" (gratidão específica > genérica).
  prompts: [
    "Pelo que você sorriu hoje, mesmo que pequeno?",
    "Quem facilitou a sua vida essa semana sem você pedir?",
    "Que parte do seu corpo merece um obrigado hoje?",
    "Que som, cheiro ou sabor das últimas horas valeu a pena?",
    "Qual dificuldade já superada deixou uma força em você?",
    "O que de absolutamente banal funcionou bem hoje?",
    "Quem acreditou em você num momento frágil?",
    "Que coisa boa está por vir nos próximos dias?",
    "Qual conversa recente deixou você um pouco melhor?",
    "Que canto da sua casa te acolheu hoje?"
  ],
  tarefas: [
    {
      t: "Escreva três coisas boas que aconteceram hoje e, para cada uma, o porquê de ela ter acontecido. Quanto mais específico, melhor.",
      f: "O exercício “três coisas boas” aumentou a felicidade e reduziu sintomas depressivos por até seis meses em estudo controlado com milhares de participantes.",
      fonte: "American Psychologist, 2005 · Seligman et al."
    },
    {
      t: "Mantenha por uma semana uma lista de motivos de gratidão, anotando algo novo a cada dia. Comece agora com o primeiro item.",
      f: "No estudo clássico de “contar bênçãos”, quem listou gratidões semanalmente relatou mais bem-estar, mais otimismo e até mais exercício físico do que os grupos de comparação.",
      fonte: "Journal of Personality and Social Psychology, 2003 · Emmons & McCullough"
    },
    {
      t: "Escreva uma carta de gratidão (alguns parágrafos) para alguém que mudou sua vida e nunca foi agradecido à altura. Se puder, entregue ou leia para a pessoa.",
      f: "A “visita de gratidão” produziu o maior ganho imediato de felicidade entre os exercícios de psicologia positiva testados, com efeito durando cerca de um mês.",
      fonte: "American Psychologist, 2005 · Seligman et al.",
      n: "Expressar amor enquanto há tempo é o que transforma gratidão em vínculo."
    },
    {
      t: "Envie agora uma mensagem curta agradecendo alguém por algo específico que fez por você recentemente.",
      f: "Pessoas subestimam sistematicamente o impacto de mensagens de gratidão: os destinatários se sentem significativamente mais tocados do que o remetente imagina.",
      fonte: "Psychological Science, 2018 · Kumar & Epley"
    },
    {
      t: "Subtração mental: escolha algo bom da sua vida e imagine, em detalhe, como seria se nunca tivesse acontecido. Depois volte e olhe para o que você tem.",
      f: "Pensar em como um evento positivo poderia não ter ocorrido aumentou o afeto positivo mais do que simplesmente relembrá-lo, em estudos experimentais.",
      fonte: "Journal of Personality and Social Psychology, 2008 · Koo, Algoe, Wilson & Gilbert"
    },
    {
      t: "Antes de dormir hoje, anote uma coisa pela qual é grato e por que ela aconteceu. Deixe papel e caneta ao lado da cama agora.",
      f: "Gratidão pré-sono está associada a pensamentos noturnos mais positivos, sono mais longo e de melhor qualidade em estudos com diários de sono.",
      fonte: "Journal of Psychosomatic Research, 2009 · Wood et al."
    },
    {
      t: "Agradeça ao seu corpo por três coisas que ele fez por você hoje sem que você pedisse: digestão, batimentos, cicatrização, equilíbrio.",
      f: "Práticas de apreciação corporal reduzem autocrítica e melhoram a imagem corporal, fator protetor consistente em saúde mental.",
      fonte: "Body Image · pesquisas de apreciação corporal (Tylka)",
      n: "Na medicina chinesa, reconhecer o trabalho silencioso dos órgãos é parte de nutrir o equilíbrio interno."
    },
    {
      t: "Caminhada de gratidão: ande 10 minutos nomeando mentalmente uma coisa boa a cada quarteirão ou a cada 20 passos.",
      f: "Combinar caminhada e foco no positivo une dois moduladores de humor bem documentados: atividade física leve e redirecionamento atencional.",
      fonte: "Harvard Health Publishing · exercício e humor"
    },
    {
      t: "Gratidão dos cinco sentidos: nomeie uma coisa boa que você viu, ouviu, cheirou, tocou e provou nas últimas 24 horas.",
      f: "Ancorar a gratidão em experiências sensoriais concretas evita a habituação — o principal motivo pelo qual listas genéricas perdem efeito com o tempo.",
      fonte: "The Journal of Positive Psychology · variedade em intervenções de gratidão"
    },
    {
      t: "Releia mensagens antigas e carinhosas que você recebeu e responda a uma delas com um agradecimento, mesmo tardio.",
      f: "Relembrar afeto recebido reativa os circuitos de recompensa social; gratidão expressa fortalece relações pelo ciclo de perceber-lembrar-vincular.",
      fonte: "Personal Relationships · Algoe, teoria find-remind-bind"
    },
    {
      t: "Agradeça por uma dificuldade já superada: escreva o que ela exigiu de você e que força ficou como herança.",
      f: "Reavaliar adversidades passadas em busca de significado (reappraisal) é uma das estratégias de regulação emocional com maior suporte experimental.",
      fonte: "Handbook of Emotion Regulation · James Gross, Stanford"
    },
    {
      t: "Na próxima refeição, coma os três primeiros bocados em silêncio, prestando atenção total ao sabor, como agradecimento a quem produziu o alimento.",
      f: "Saborear deliberadamente (savoring) amplifica o prazer de experiências comuns e está associado a maior satisfação com a vida.",
      fonte: "Savoring: A New Model of Positive Experience · Bryant & Veroff"
    },
    {
      t: "Escolha uma foto no seu celular que te faz bem e escreva uma legenda de gratidão para ela — só para você.",
      f: "Reviver memórias positivas em detalhe ativa o estriado ventral e melhora o humor; fotografias funcionam como pistas potentes de recuperação dessas memórias.",
      fonte: "Nature Human Behaviour · neurociência da reminiscência positiva"
    },
    {
      t: "Diga obrigado, em voz alta e com o nome da pessoa, a alguém que costuma ser invisível no seu dia: porteiro, motorista, atendente.",
      f: "Expressões diretas de gratidão aumentam o senso de valor social de quem recebe e a disposição de ajudar de novo — efeito replicado em estudos de campo.",
      fonte: "Journal of Personality and Social Psychology · Grant & Gino",
      n: "Ver quem ninguém vê é uma forma concreta de amor ao próximo."
    },
    {
      t: "Liste três qualidades suas pelas quais você é grato. Trate-se com a mesma generosidade que dedicaria a um amigo.",
      f: "Autocompaixão está associada a menos ansiedade e depressão e a mais resiliência, com efeitos consistentes em meta-análises.",
      fonte: "Self and Identity · Kristin Neff, Universidade do Texas"
    },
    {
      t: "Gratidão antecipada: escreva uma coisa boa que vai acontecer nos próximos dias e o que ela vai te proporcionar.",
      f: "A antecipação de eventos positivos ativa o sistema de recompensa antes mesmo do evento — saborear o futuro é uma fonte de bem-estar por si só.",
      fonte: "Journal of Experimental Psychology · antecipação e afeto positivo"
    },
    {
      t: "Pense em alguém que acreditou em você num momento frágil. Reserve um minuto inteiro só para sentir esse cuidado — e considere contar a ela.",
      f: "O Estudo de Desenvolvimento Adulto de Harvard, com mais de 80 anos de acompanhamento, aponta a qualidade dos relacionamentos como o maior preditor de saúde e felicidade na vida.",
      fonte: "Harvard Study of Adult Development · Robert Waldinger"
    },
    {
      t: "Agradeça por algo absolutamente banal que funciona: a água da torneira, a luz que acende, o ônibus que passa. Escolha um e olhe para ele de verdade.",
      f: "O cérebro se habitua ao que é constante; a atenção deliberada ao ordinário reativa a resposta de recompensa que a rotina silenciou.",
      fonte: "Trends in Cognitive Sciences · habituação hedônica"
    },
    {
      t: "Monte um pote de gratidão: um recipiente e papéis. Hoje, deposite o primeiro bilhete com algo bom do dia.",
      f: "Rituais físicos e visíveis aumentam a adesão a práticas de gratidão — e a releitura dos bilhetes em dias difíceis funciona como reserva de afeto positivo.",
      fonte: "The Journal of Positive Psychology · intervenções de gratidão sustentadas"
    },
    {
      t: "Agradeça a um professor ou mentor, por mensagem, contando em uma frase o que o ensinamento dele mudou em você.",
      f: "Receber gratidão aumenta o senso de propósito de quem ensina; enviar aumenta o bem-estar de quem escreve — efeito dos dois lados documentado em estudos de cartas de gratidão.",
      fonte: "Psychological Science, 2018 · Kumar & Epley"
    },
    {
      t: "Olhe pela janela e encontre três coisas vivas para agradecer: uma árvore, um pássaro, uma pessoa passando.",
      f: "Microcontatos com a natureza, mesmo breves e urbanos, reduzem afeto negativo e ruminação, segundo a pesquisa em psicologia ambiental.",
      fonte: "Frontiers in Psychology, 2019 · Hunter et al., a “pílula de natureza”"
    },
    {
      t: "Gratidão pelo trabalho de muitos: escolha um objeto do seu dia (xícara, celular, cadeira) e trace mentalmente quantas mãos foram necessárias até ele chegar a você.",
      f: "Refletir sobre a interdependência aumenta emoções autotranscendentes como gratidão e elevação, associadas a mais comportamento prossocial.",
      fonte: "Annual Review of Psychology · emoções autotranscendentes (Keltner)",
      n: "Somos sustentados por uma teia invisível de pessoas — lembrar disso é se sentir menos só."
    },
    {
      t: "Transforme uma reclamação de hoje em gratidão: o trânsito vira “tenho aonde ir”, a louça vira “tive o que comer”. Escolha uma e reescreva.",
      f: "O reenquadramento cognitivo muda a resposta emocional sem negar o problema — é o núcleo das técnicas cognitivo-comportamentais para humor e estresse.",
      fonte: "Harvard Health Publishing · reestruturação cognitiva"
    },
    {
      t: "Agradeça em silêncio por alguém que já partiu e deixou algo bom em você. Nomeie o que permanece.",
      f: "A reminiscência integrativa — lembrar com gratidão em vez de apenas saudade — está associada a luto mais saudável e a maior bem-estar em estudos longitudinais.",
      fonte: "Death Studies · pesquisa sobre luto e memória positiva"
    },
    {
      t: "Termine o dia respondendo a uma pergunta: quem facilitou a minha vida hoje sem que eu pedisse? Agradeça mentalmente a essa pessoa, com nome.",
      f: "Notar benfeitores específicos (e não “a vida” em geral) é o ingrediente que diferencia as intervenções de gratidão eficazes das genéricas, segundo a literatura da área.",
      fonte: "Journal of Personality and Social Psychology · Emmons & McCullough"
    }
  ]
};
