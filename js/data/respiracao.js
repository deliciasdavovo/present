window.PRACTICES = window.PRACTICES || {};
window.PRACTICES["respiracao"] = {
  tarefas: [
    {
      t: "Respiração do triângulo: inspire em 4 segundos, segure em 4, expire em 4. Siga o ponto percorrendo cada lado do triângulo.",
      f: "Ritmos respiratórios regulares e lentos aumentam a variabilidade da frequência cardíaca e reduzem marcadores de estresse, segundo revisões de estudos sobre respiração lenta controlada.",
      fonte: "Frontiers in Human Neuroscience, 2018 · Zaccaro et al.",
      anim: { type: "triangle", cycles: 6, phases: [
        { label: "Inspire", dur: 4, to: 1 },
        { label: "Segure", dur: 4, to: 1 },
        { label: "Expire", dur: 4, to: 0 }
      ] }
    },
    {
      t: "Narina alternada: com o polegar, tampe a narina indicada e respire pela outra, seguindo o guia. Sem pressa, sem forçar.",
      f: "Ensaios clínicos com a respiração por narinas alternadas mostram redução da pressão arterial e da frequência cardíaca e melhora de índices de equilíbrio autonômico após algumas semanas de prática.",
      fonte: "Medical Science Monitor Basic Research · Telles et al.",
      n: "Na medicina chinesa, alternar as narinas é visto como um modo de equilibrar yin e yang.",
      anim: { type: "nostril", cycles: 5, phases: [
        { label: "Tampe a direita · inspire pela esquerda", dur: 4, to: 1, side: "L" },
        { label: "Tampe a esquerda · expire pela direita", dur: 6, to: 0, side: "R" },
        { label: "Inspire pela direita", dur: 4, to: 1, side: "R" },
        { label: "Tampe a direita · expire pela esquerda", dur: 6, to: 0, side: "L" }
      ] }
    },
    {
      t: "Suspiro fisiológico: duas inspirações pelo nariz (uma longa e uma curta por cima) e uma expiração lenta e completa pela boca.",
      f: "Em um ensaio randomizado de Stanford, 5 minutos diários de suspiros cíclicos melhoraram o humor e reduziram a frequência respiratória de repouso mais do que meditação mindfulness.",
      fonte: "Cell Reports Medicine, 2023 · Balban et al., Universidade Stanford",
      anim: { type: "sigh", cycles: 8, phases: [
        { label: "Inspire", dur: 2, to: 0.75 },
        { label: "Inspire mais um pouco", dur: 1, to: 1 },
        { label: "Expire devagar pela boca", dur: 6, to: 0 }
      ] }
    },
    {
      t: "Respiração quadrada (box breathing): inspire em 4, segure em 4, expire em 4, segure vazio em 4. Acompanhe o ponto pelo quadrado.",
      f: "A respiração em caixa é usada em programas de manejo de estresse de alta pressão; padrões respiratórios simétricos e lentos ativam o sistema nervoso parassimpático e melhoram o foco.",
      fonte: "Harvard Health Publishing · técnicas de relaxamento",
      anim: { type: "box", cycles: 6, phases: [
        { label: "Inspire", dur: 4, to: 1 },
        { label: "Segure", dur: 4, to: 1 },
        { label: "Expire", dur: 4, to: 0 },
        { label: "Segure vazio", dur: 4, to: 0 }
      ] }
    },
    {
      t: "Coerência cardíaca: respire no ritmo do círculo — 5 segundos para encher, 5 segundos para esvaziar — por cerca de 3 minutos.",
      f: "Respirar perto de 6 ciclos por minuto maximiza a variabilidade da frequência cardíaca (ressonância), um dos índices mais estudados de regulação do sistema nervoso autônomo.",
      fonte: "Frontiers in Psychology · Lehrer & Gevirtz, biofeedback de VFC",
      anim: { type: "circle", cycles: 18, phases: [
        { label: "Inspire", dur: 5, to: 1 },
        { label: "Expire", dur: 5, to: 0 }
      ] }
    },
    {
      t: "Respiração 4-7-8: inspire pelo nariz em 4, segure em 7 e expire pela boca em 8, com um sopro suave.",
      f: "Popularizada pelo médico Andrew Weil, formado em Harvard, combina retenção e expiração prolongada — a fase do ciclo respiratório que mais desacelera o coração via nervo vago.",
      fonte: "Universidade do Arizona · Andrew Weil, M.D.",
      anim: { type: "triangle", cycles: 4, phases: [
        { label: "Inspire pelo nariz", dur: 4, to: 1 },
        { label: "Segure", dur: 7, to: 1 },
        { label: "Expire pela boca", dur: 8, to: 0 }
      ] }
    },
    {
      t: "Respiração diafragmática: mão na barriga, respire de modo que só ela se mova. O círculo cresce quando a barriga enche.",
      f: "Oito semanas de treino de respiração diafragmática reduziram o cortisol salivar e melhoraram a atenção sustentada em adultos saudáveis em estudo controlado.",
      fonte: "Frontiers in Psychology, 2017 · Ma et al.",
      n: "Na medicina chinesa, respirar para o baixo-ventre leva o qi ao dan tian, o centro de energia do corpo.",
      anim: { type: "circle", cycles: 10, phases: [
        { label: "Inspire para a barriga", dur: 4, to: 1 },
        { label: "Expire soltando", dur: 6, to: 0 }
      ] }
    },
    {
      t: "Resposta de relaxamento: a cada expiração, repita mentalmente uma palavra neutra (como “calma” ou “um”). Deixe os pensamentos passarem e volte à palavra.",
      f: "Descrita pelo cardiologista Herbert Benson, de Harvard, a resposta de relaxamento reduz pressão arterial, frequência cardíaca e consumo de oxigênio — o oposto fisiológico da resposta de estresse.",
      fonte: "Harvard Medical School · Herbert Benson, The Relaxation Response",
      anim: { type: "circle", cycles: 15, phases: [
        { label: "Inspire", dur: 4, to: 1 },
        { label: "Expire · repita a palavra", dur: 6, to: 0 }
      ] }
    },
    {
      t: "Expiração estendida 4-6: inspire em 4 segundos e expire em 6, sem pausas. Deixe cada saída de ar ser mais longa que a entrada.",
      f: "Expirar mais devagar do que se inspira aumenta a atividade vagal — revisões mostram efeito calmante mensurável já em poucos minutos de prática.",
      fonte: "Frontiers in Human Neuroscience, 2018 · Zaccaro et al.",
      anim: { type: "circle", cycles: 12, phases: [
        { label: "Inspire", dur: 4, to: 1 },
        { label: "Expire longo", dur: 6, to: 0 }
      ] }
    },
    {
      t: "Contagem de respirações: conte mentalmente cada expiração até 9 e recomece. Se perder a conta, volte ao 1 sem se criticar.",
      f: "A contagem de respirações foi validada como treino e medida objetiva de atenção plena; praticantes mostram menos divagação mental e melhor humor.",
      fonte: "Frontiers in Psychology, 2014 · Levinson et al., Universidade de Wisconsin",
      anim: { type: "circle", cycles: 9, phases: [
        { label: "Inspire", dur: 4, to: 1 },
        { label: "Expire · conte", dur: 5, to: 0 }
      ] }
    },
    {
      t: "Observação pura: por alguns minutos, apenas observe sua respiração natural, sem mudar nada. Note onde o ar toca e o ritmo que ele tem hoje.",
      f: "Oito semanas de atenção à respiração e ao corpo aumentaram a densidade de massa cinzenta no hipocampo e reduziram a da amígdala em exames de ressonância magnética.",
      fonte: "Psychiatry Research, 2011 · Sara Lazar, Mass. General Hospital / Harvard",
      anim: { type: "circle", cycles: 12, phases: [
        { label: "Inspire · apenas observe", dur: 4, to: 1 },
        { label: "Expire · apenas observe", dur: 5, to: 0 }
      ] }
    },
    {
      t: "Cantarolar na expiração: inspire pelo nariz e expire emitindo um “mmm” contínuo, sentindo a vibração no rosto e no peito.",
      f: "Cantarolar multiplica em até 15 vezes o óxido nítrico nasal, gás que dilata vasos e vias aéreas, além de prolongar a expiração — a fase calmante do ciclo.",
      fonte: "American Journal of Respiratory and Critical Care Medicine, 2002 · Weitzberg & Lundberg, Instituto Karolinska",
      anim: { type: "circle", cycles: 8, phases: [
        { label: "Inspire pelo nariz", dur: 3, to: 1 },
        { label: "Expire com “mmm”", dur: 8, to: 0 }
      ] }
    },
    {
      t: "Respiração com lábios semicerrados: inspire pelo nariz em 2 tempos e expire em 4 pela boca quase fechada, como soprando por um canudo.",
      f: "Técnica clássica da reabilitação pulmonar: a leve resistência na saída mantém as vias aéreas abertas, desacelera a respiração e reduz a sensação de falta de ar e ansiedade.",
      fonte: "American Lung Association · pursed-lip breathing",
      anim: { type: "circle", cycles: 10, phases: [
        { label: "Inspire pelo nariz", dur: 2, to: 1 },
        { label: "Expire pelos lábios", dur: 4, to: 0 }
      ] }
    },
    {
      t: "Respiração 7-11: inspire contando até 7 e expire contando até 11. Contagens longas exigem atenção total — e atenção total acalma.",
      f: "Expirações prolongadas estimulam o nervo vago, e a carga cognitiva da contagem interrompe ciclos de ruminação, dupla via de redução de ansiedade descrita na literatura de respiração lenta.",
      fonte: "Frontiers in Human Neuroscience, 2018 · Zaccaro et al.",
      anim: { type: "circle", cycles: 8, phases: [
        { label: "Inspire", dur: 7, to: 1 },
        { label: "Expire", dur: 11, to: 0 }
      ] }
    },
    {
      t: "Três respirações antes de agir: antes da próxima resposta difícil ou decisão, faça apenas 3 ciclos completos e lentos.",
      f: "Pausas respiratórias breves reduzem a reatividade da amígdala e dão ao córtex pré-frontal tempo de retomar o controle — melhorando a qualidade da resposta que vem depois.",
      fonte: "Harvard Health Publishing · estresse e tomada de decisão",
      anim: { type: "circle", cycles: 3, phases: [
        { label: "Inspire fundo", dur: 4, to: 1 },
        { label: "Expire devagar", dur: 6, to: 0 }
      ] }
    },
    {
      t: "Mão no coração: pouse a mão sobre o peito, sinta o calor e respire lento até perceber o corpo ceder.",
      f: "O toque afetivo — mesmo o próprio — ativa fibras nervosas ligadas a segurança e conforto e reduz a resposta de estresse, segundo a pesquisa em neurociência do toque.",
      fonte: "Neuroscience & Biobehavioral Reviews · toque afetivo (fibras C-táteis)",
      n: "Amor e conexão começam no próprio corpo: este é o gesto de acolhimento que você daria a alguém querido.",
      anim: { type: "circle", cycles: 10, phases: [
        { label: "Inspire sentindo a mão", dur: 4, to: 1 },
        { label: "Expire soltando o peso", dur: 6, to: 0 }
      ] }
    },
    {
      t: "Quadrado lento de 5: a mesma respiração em caixa, com 5 segundos por lado, para quando você já domina a de 4.",
      f: "Alongar gradualmente as fases respiratórias aumenta o efeito sobre a variabilidade cardíaca sem gerar desconforto — a progressão é o que consolida a adaptação fisiológica.",
      fonte: "Psychophysiology · Lehrer et al., treino de respiração lenta",
      anim: { type: "box", cycles: 5, phases: [
        { label: "Inspire", dur: 5, to: 1 },
        { label: "Segure", dur: 5, to: 1 },
        { label: "Expire", dur: 5, to: 0 },
        { label: "Segure vazio", dur: 5, to: 0 }
      ] }
    },
    {
      t: "Suspiros cíclicos por 5 minutos: repita o suspiro fisiológico com calma, deixando cada expiração mais solta que a anterior.",
      f: "No estudo de Stanford, o protocolo de 5 minutos diários por um mês foi a técnica com maior ganho de afeto positivo entre as testadas, com efeito crescente ao longo das semanas.",
      fonte: "Cell Reports Medicine, 2023 · Balban et al., Universidade Stanford",
      anim: { type: "sigh", cycles: 18, phases: [
        { label: "Inspire", dur: 2, to: 0.75 },
        { label: "Complete a inspiração", dur: 1, to: 1 },
        { label: "Expire bem devagar", dur: 7, to: 0 }
      ] }
    },
    {
      t: "Respiração nasal lenta: por 2 minutos, respire apenas pelo nariz, deixando o ritmo cair naturalmente.",
      f: "A respiração nasal filtra e umidifica o ar e envolve o óxido nítrico produzido nos seios da face, que melhora a oxigenação — além de favorecer ritmos mais lentos que os da respiração bucal.",
      fonte: "Harvard Health Publishing · respiração nasal",
      anim: { type: "circle", cycles: 12, phases: [
        { label: "Inspire pelo nariz", dur: 4, to: 1 },
        { label: "Expire pelo nariz", dur: 5, to: 0 }
      ] }
    },
    {
      t: "Triângulo invertido 4-4-8: inspire em 4, segure em 4 e expire em 8 — todo o peso da prática na saída do ar.",
      f: "A proporção expiratória dobrada acentua o predomínio parassimpático; protocolos com expiração longa mostram queda de frequência cardíaca e de ansiedade-estado em poucos minutos.",
      fonte: "Frontiers in Human Neuroscience, 2018 · Zaccaro et al.",
      anim: { type: "triangle", cycles: 6, phases: [
        { label: "Inspire", dur: 4, to: 1 },
        { label: "Segure", dur: 4, to: 1 },
        { label: "Expire bem longo", dur: 8, to: 0 }
      ] }
    },
    {
      t: "Narina alternada com pausa: inspire por uma narina, segure 2 segundos com as duas tampadas, e expire pela outra.",
      f: "Variações com retenção breve aparecem nos protocolos de pranayama estudados clinicamente, com melhora de atenção e redução de pressão arterial em praticantes regulares.",
      fonte: "International Journal of Yoga · revisões de nadi shodhana",
      anim: { type: "nostril", cycles: 4, phases: [
        { label: "Inspire pela esquerda", dur: 4, to: 1, side: "L" },
        { label: "Segure as duas", dur: 2, to: 1, side: "L" },
        { label: "Expire pela direita", dur: 6, to: 0, side: "R" },
        { label: "Inspire pela direita", dur: 4, to: 1, side: "R" },
        { label: "Segure as duas", dur: 2, to: 1, side: "R" },
        { label: "Expire pela esquerda", dur: 6, to: 0, side: "L" }
      ] }
    },
    {
      t: "Respiração para dormir: deitado, inspire em 4 e expire em 8, deixando o corpo afundar no colchão a cada saída de ar.",
      f: "Técnicas de respiração lenta antes de dormir reduzem a ativação fisiológica pré-sono e estão entre as recomendações não medicamentosas da medicina do sono comportamental.",
      fonte: "Harvard Medical School, Division of Sleep Medicine",
      anim: { type: "circle", cycles: 10, phases: [
        { label: "Inspire", dur: 4, to: 1 },
        { label: "Expire afundando", dur: 8, to: 0 }
      ] }
    },
    {
      t: "Um minuto de pausa: pare o que estiver fazendo e siga o círculo por apenas 6 ciclos. É curto de propósito — para caber em qualquer dia.",
      f: "Micropausas respiratórias distribuídas ao longo do dia previnem o acúmulo de carga de estresse com mais eficiência do que uma única pausa longa, segundo a pesquisa sobre recuperação no trabalho.",
      fonte: "Journal of Applied Psychology · pesquisa sobre micropausas",
      anim: { type: "circle", cycles: 6, phases: [
        { label: "Inspire", dur: 4, to: 1 },
        { label: "Expire", dur: 6, to: 0 }
      ] }
    },
    {
      t: "Respiração em dupla: sente-se ao lado de alguém e respirem juntos no ritmo do círculo, em silêncio, por 2 minutos.",
      f: "A co-regulação é real: parceiros em interação calma sincronizam ritmos cardíacos e respiratórios, e a presença de um vínculo seguro reduz a resposta neural a ameaças.",
      fonte: "Psychological Science · Coan et al., hand-holding e regulação",
      n: "Respirar junto é uma forma silenciosa de dizer: você não está só.",
      anim: { type: "circle", cycles: 12, phases: [
        { label: "Inspirem juntos", dur: 4, to: 1 },
        { label: "Expirem juntos", dur: 6, to: 0 }
      ] }
    },
    {
      t: "Box de foco pré-tarefa: antes de começar algo que exige concentração, faça 4 ciclos de respiração quadrada.",
      f: "Padrões respiratórios regulares modulam a atividade do locus coeruleus, centro de noradrenalina ligado ao alerta — ajudando a chegar à tarefa no nível certo de ativação.",
      fonte: "Journal of Neurophysiology · respiração e locus coeruleus",
      anim: { type: "box", cycles: 4, phases: [
        { label: "Inspire", dur: 4, to: 1 },
        { label: "Segure", dur: 4, to: 1 },
        { label: "Expire", dur: 4, to: 0 },
        { label: "Segure vazio", dur: 4, to: 0 }
      ] }
    }
  ]
};
