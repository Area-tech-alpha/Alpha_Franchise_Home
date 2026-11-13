import { wpUrl } from "@/lib/site";

// Textos literais da home atual (assessorialpha.com, WordPress). Não invente texto,
// número ou imagem: campo sem confirmação fica null e o componente oculta.

export type NavLink = { label: string; href: string; external?: boolean };

const wp = {
  pizzaria: wpUrl("alphass-pizzaria/"),
  blog: wpUrl("blog/"),
  cursos: wpUrl("cursos/"),
  cases: wpUrl("cases-alpha/"),
  midia: wpUrl("o-que-dizem-sobre-a-alpha/"),
};

export const content = {
  meta: {
    title: "Alpha Assessoria: A Maior Assessoria de Marketing Gastronômico da América Latina",
    description:
      "A Alpha é a maior assessoria de marketing especializada em restaurantes da América Latina. Estrutura 100% presencial, metodologia validada por mais de 2.000 donos de restaurante. Restaurantes não querem likes, querem mesas cheias.",
    ogTitle: "Alpha Assessoria: A Maior Assessoria de Marketing Gastronômico da América Latina",
    ogDescription:
      "Marketing bonito não enche mesa. Resultado, sim. Estrutura 100% presencial, metodologia validada por mais de 2.000 donos de restaurante.",
    siteName: "Alpha Assessoria",
  },

  logo: { src: "/images/logo-alpha.png", alt: "Alpha Assessoria", width: 764, height: 247 },

  nav: {
    links: [
      { label: "Nossa história", href: "/#historia" },
      { label: "Liderança", href: "/#equipe" },
      { label: "Metodologia", href: "/#metodologia" },
      { label: "Alpha's Pizzaria", href: wp.pizzaria, external: true },
      { label: "Blog", href: wp.blog, external: true },
      { label: "Cursos", href: wp.cursos, external: true },
      { label: "Cases", href: wp.cases, external: true },
      { label: "Alpha na Mídia", href: wp.midia, external: true },
    ] satisfies NavLink[],
    cta: { label: "Fale com a gente", href: "/#contato" },
  },

  hero: {
    eyebrow: "A maior assessoria de marketing gastronômico da américa latina",
    titleLine1: "Faça de 2026 o ano",
    titleLine2: "mais lucrativo do seu restaurante.",
    subtitle:
      "Somos a maior assessoria de marketing para restaurantes da América Latina, com mais de 70 escritórios espalhados pelo Brasil. Nossa equipe é própria, presencial, e nossa metodologia já foi validada por mais de 3.000 clientes.",
    trust: [
      { value: "+3.000", label: "clientes" },
      { value: "80+", label: "especialistas" },
      { value: "100%", label: "presencial" },
    ],
    secondaryCta: { label: "Conheça nossa história", href: "#historia" },
    formTitle: "Fale com a gente",
    formSubtitle: "Preencha e um especialista da Alpha entra em contato.",
  },

  form: {
    fields: {
      nome: { label: "Nome", placeholder: "Seu nome" },
      email: { label: "E-mail", placeholder: "Seu melhor e-mail" },
      telefone: { label: "Telefone", placeholder: "(00) 00000-0000" },
      empresa: { label: "Empresa", placeholder: "Nome da empresa" },
      segmento: {
        label: "Segmento",
        placeholder: "Selecionar segmento",
        options: [
          "Pizzarias",
          "Hamburguerias",
          "Restaurante comida brasileira",
          "Churrascaria steakhouse",
          "Restaurante japonês",
          "Restaurante massas italiano",
          "Restaurante comida árabe",
          "Açaí / sorveteria",
          "Cafeteria",
          "Doceria",
          "Gastrobar",
          "Outros",
        ],
      },
      faturamento: {
        label: "Faturamento atual",
        placeholder: "Selecionar",
        options: [
          "Até 30 mil",
          "30 mil até 50 mil",
          "50 mil até 80 mil",
          "80 mil até 100 mil",
          "100 mil até 150 mil",
          "150 mil até 250 mil",
          "250 mil até 400 mil",
          "400 mil até 600 mil",
          "600 mil até 1 milhão",
          "Mais de 1 milhão",
        ],
      },
      cnpj: { label: "CNPJ", placeholder: "00.000.000/0000-00" },
      investiria: {
        label: "Você investiria R$4.000 por mês para vender mais?",
        placeholder: "Selecionar",
        options: ["Sim", "Não"],
      },
    },
    submitLabel: "Quero conversar",
    sending: "Enviando...",
    errors: {
      crm: "Não conseguimos enviar agora. Tente de novo em instantes.",
      validation: "Dados inválidos. Verifique o formulário.",
      // {min} = minutos até liberar (lib/rate-limit.ts).
      rateLimited: "Recebemos seu cadastro há pouco. Tente novamente em {min} min.",
    },
  },

  pizzaria: {
    eyebrow: "Prova social",
    title: "Nós somos o nosso próprio case (Alpha's Pizzaria)",
    text: "Antes de vender para você, validamos em nós mesmos. A Alpha's Pizzaria é a prova de que a nossa metodologia não é teoria: em apenas 3 meses de operação, saímos do zero para R$400 mil de faturamento, com investimento em marketing feito pela própria assessoria.",
    image: {
      src: "/images/alphas-pizzaria-fachada.webp",
      alt: "Alpha's Pizzaria, case próprio da Alpha Assessoria",
      width: 1086,
      height: 1448,
    },
    stats: [
      { value: "+12k", label: "novos seguidores" },
      { value: "+90%", label: "mesas ocupadas" },
      { value: "+18%", label: "ticket médio" },
      { value: "-30%", label: "custo por cliente" },
    ],
  },

  marcas: {
    label: "Metodologia validada por marcas como",
    logos: [
      { name: "Bonamix", src: "/images/marcas/bonamix.png" },
      { name: "La Bicca Pizzaria", src: "/images/marcas/la-bicca-pizzaria.png" },
      { name: "Kingdom's Burger", src: "/images/marcas/kingdoms-burger.png" },
      { name: "O Forno", src: "/images/marcas/o-forno.png" },
      { name: "Patroni Delivery", src: "/images/marcas/patroni-delivery.png" },
      { name: "American Cookies", src: "/images/marcas/american-cookies.png" },
      { name: "Milky Moo", src: "/images/marcas/milky-moo.png" },
      { name: "Gont's", src: "/images/marcas/gonts.png" },
      { name: "Ped's", src: "/images/marcas/peds.png" },
      { name: "Nonno Peppe Pizzaria", src: "/images/marcas/nonno-peppe-pizzaria.png" },
      { name: "Lavi", src: "/images/marcas/lavi.png" },
      { name: "Pedaço da Pizza", src: "/images/marcas/pedaco-da-pizza.png" },
      { name: "Dog King", src: "/images/marcas/dog-king.png" },
    ],
  },

  lideranca: {
    eyebrow: "Liderança",
    title: "As pessoas que fazem a Alpha acontecer",
    people: [
      { name: "Athos Vilarins", role: "CEO & Founder", photo: "/images/lideranca/athos-vilarins.webp" },
      { name: "Pedro Dias", role: "COO", photo: "/images/lideranca/pedro-dias.webp" },
      { name: "Gustavo Silva", role: "CFO", photo: "/images/lideranca/gustavo-silva.webp" },
    ],
  },

  // No WP os contadores aparecem zerados. Cada valor fica null (e oculto) até o
  // número real ser confirmado. Ex.: value: "R$500M+".
  numeros: {
    eyebrow: "Nossos números",
    title: "Resultado não é opinião. É número.",
    destaque: {
      value: null as string | null,
      label: "gerados em vendas para os restaurantes que confiaram na Alpha",
    },
    items: [
      { value: null as string | null, label: "restaurantes já atendidos" },
      { value: null as string | null, label: "especialistas dedicados" },
      { value: null as string | null, label: "de aumento médio no faturamento" },
      { value: null as string | null, label: "franqueados pelo Brasil" },
    ],
  },

  historia: {
    eyebrow: "Nossa história",
    title: 'De 119 "nãos" à maior assessoria da américa latina',
    // Separado dos demais: o nome do Gustavo de Oliveira ainda depende de confirmação.
    fundacao: {
      date: "Novembro de 2022",
      title: "A fundação",
      text: "Athos Vilarins e Gustavo de Oliveira, com 18 anos, transformam um trabalho informal de tráfego pago na universidade em uma empresa.",
    },
    marcos: [
      {
        date: "O começo",
        title: '120 portas. 119 "nãos".',
        text: "Antes do primeiro cliente, foram 120 restaurantes visitados porta a porta em busca de uma chance.",
        quote: '"Levei 119 nãos. Mas um único sim deu início à nossa história."',
      },
      {
        date: "O divisor de águas",
        title: "De R$50 mil a R$700 mil por mês",
        text: "Uma pizzaria modesta de Curitiba apostou na Alpha. Em poucos meses, o faturamento saltou e o mercado começou a enxergar o potencial da metodologia.",
        highlight: true,
      },
      {
        date: "Expansão",
        title: "Estrutura 100% presencial, estado por estado",
        text: "A operação cresce sem abrir mão do que a diferencia: nada de terceirização, equipe própria em múltiplos estados.",
      },
      {
        date: "Prova real",
        title: "Nasce a Alpha's Pizzaria",
        text: "Antes de vender qualquer estratégia, a Alpha decide testar em si mesma, fundando sua própria pizzaria como laboratório vivo da metodologia.",
      },
      {
        date: "Hoje",
        title: "A maior assessoria de marketing gastronômico da América Latina",
        text: "Mais de 2.000 restaurantes já passaram pela metodologia Alpha, e a expansão continua, com o CRM próprio para gastronomia a caminho.",
        highlight: true,
      },
    ] as { date: string; title: string; text: string; quote?: string; highlight?: boolean }[],
  },

  midia: {
    eyebrow: "Imprensa",
    title: "O que dizem sobre a Alpha",
    items: [
      {
        outlet: "Forbes Portugal",
        title: "A empresa que está redefinindo o marketing gastronômico",
        text: "Como a Alpha virou referência em marketing pra restaurantes na América Latina.",
        href: "https://www.forbespt.com/assessoria-alpha-a-empresa-que-esta-a-redefinir-o-marketing-gastronomico/",
        image: { src: "/images/midia/forbes-portugal.webp", alt: "Forbes Portugal sobre a Alpha Assessoria" },
      },
      {
        outlet: "Caras Brasil",
        title: "Athos Vilarins e a ascensão da Assessoria Alpha",
        text: "A trajetória do fundador e como a empresa virou potência do setor gastronômico.",
        href: "https://caras.com.br/personalidades/athos-vilarins-transforma-assessoria-alpha-em-potencia-do-marketing-gastronomico.phtml",
        image: { src: "/images/midia/caras-brasil.webp", alt: "Caras Brasil sobre Athos Vilarins e a Alpha Assessoria" },
      },
      {
        outlet: "Metrópoles",
        title: "A empresa que movimenta milhões no food service",
        text: "Como a Alpha fatura milhões por ano ajudando restaurantes a vender mais.",
        href: "https://www.metropoles.com/conteudo-especial/empresa-de-marketing-gastronomico-movimenta-milhoes-por-ano-no-brasil",
        image: { src: "/images/midia/metropoles.webp", alt: "Metrópoles sobre a Alpha Assessoria" },
      },
      {
        outlet: "Ego Brazil",
        title: "Grupo Alpha aposta em tecnologia pra escalar",
        text: "Tecnologia e gestão como motor de expansão da Alpha pela América Latina.",
        href: "https://egobrazil.com.br/grupo-alpha-aposta-em-tecnologia-e-gestao-para-escalar-restaurantes-na-america-latina/",
        image: { src: "/images/midia/ego-brazil.webp", alt: "Ego Brazil sobre o Grupo Alpha" },
      },
    ],
    cta: { label: "Ver todas as matérias", href: wp.midia },
  },

  antesDepois: {
    eyebrow: "A transformação",
    title: "Os efeitos da Alpha",
    antes: {
      label: "Antes da metodologia Alpha",
      items: [
        "Dependência total do iFood",
        "Mesas vazias em dia de semana",
        "Decisões no feeling",
        "Marketing terceirizado e distante",
        "Sem controle de recorrência",
      ],
    },
    depois: {
      label: "Depois da metodologia Alpha",
      items: [
        "Canal próprio de pedidos recorrentes",
        "Salão cheio, todo dia da semana",
        "Decisões por dado, em tempo real",
        "Equipe presencial, dentro de casa",
        "Cliente que volta e indica",
      ],
    },
  },

  metodologia: {
    eyebrow: "Como pensamos",
    title: "Uma metodologia, quatro movimentos",
    subtitle:
      "Nada de fórmula genérica. Cada restaurante passa pelo mesmo processo validado, calibrado pra realidade de cada operação.",
    steps: [
      {
        title: "Diagnóstico",
        text: "Mapeamos delivery, salão, redes e concorrência pra entender exatamente onde está o gargalo.",
      },
      {
        title: "Estratégia",
        text: "Montamos um plano sob medida, com metas claras de pedidos, faturamento e recorrência.",
      },
      {
        title: "Implementação",
        text: "Nossa equipe presencial coloca a estratégia em prática: tráfego, criativos, redes e CRM.",
      },
      {
        title: "Escala",
        text: "Acompanhamento constante dos indicadores pra acelerar o crescimento mês a mês.",
      },
    ],
  },

  mapa: {
    eyebrow: "Presença nacional",
    title: "Mais de 70 franqueados espalhados por todo o Brasil.",
    text: "Cada franqueado Alpha carrega a mesma metodologia, a mesma exigência e a mesma estrutura 100% presencial, não importa a distância de Brasília.",
    image: { src: "/images/mapa-brasil.webp", alt: "Mapa do Brasil com a presença da Alpha", width: 1024, height: 1024 },
  },

  depoimentos: {
    eyebrow: "Depoimentos",
    title: "Quem já passou pela Alpha, fala por nós",
    label: "Depoimentos de clientes",
    homeCount: 4,
    cta: { label: "Ver mais depoimentos", href: "/depoimentos" },
    videos: [
      { slug: "pizzaria-cheffao", name: "Pizzaria Cheffão" },
      { slug: "menu-confianca", name: "Menu Confiança" },
      { slug: "kallebe-pizzaria-kallebe", name: "Kallebe · Pizzaria Kallebe" },
      { slug: "madruga-lanches", name: "Madruga Lanches" },
      { slug: "joao-brasa-burguer", name: "João · Brasa Burguer" },
      { slug: "trumans-burguers", name: "Truman's Burguers" },
    ],
    videoBadge: "Cliente Alpha",
    videoRole: "Restaurante parceiro",
    // badge null = oculto. "4.9 ★" e "+280%" do WP aguardam confirmação.
    shorts: [
      {
        videoId: "aoDx_HTLaWA",
        badge: "Resultado real" as string | null,
        name: "Depoimento de cliente Alpha",
        role: "Restaurante parceiro · Alpha Assessoria",
      },
      {
        videoId: "5A264VtPKEs",
        badge: null as string | null,
        name: "Depoimento de cliente Alpha",
        role: "Restaurante parceiro",
      },
      {
        videoId: "oSDQUXjzd7Y",
        badge: null as string | null,
        name: "Depoimento de cliente Alpha",
        role: "Restaurante parceiro",
      },
    ],
    page: {
      title: "Depoimentos",
      heading: "Quem já passou pela Alpha, fala por nós",
      shortsLabel: "Shorts no YouTube",
    },
  },

  faq: {
    eyebrow: "Perguntas frequentes",
    title: "Antes de falar com a gente",
    items: [
      {
        question: "Como funciona a assessoria da Alpha?",
        answer:
          "Nossa equipe presencial assume o marketing do seu restaurante de ponta a ponta: tráfego pago, iFood, redes sociais, CRM e estruturação comercial, tudo com base num diagnóstico inicial do seu negócio.",
      },
      {
        question: "Preciso ter site ou equipe de marketing pronta?",
        answer: "Não. A Alpha assume a operação de marketing do zero, com sua própria equipe e estrutura.",
      },
      {
        question: "Em quanto tempo eu vejo resultado?",
        answer: "A maioria dos restaurantes começa a ver impacto real entre 30 e 60 dias após o início da parceria.",
      },
      {
        question: "A Alpha atende só pizzarias?",
        answer:
          "Não. Atendemos hamburguerias, churrascarias, restaurantes japoneses, cafeterias, doçarias e praticamente qualquer segmento gastronômico.",
      },
      {
        question: "Vocês atendem a minha cidade?",
        answer:
          "A Alpha está presente em diversos estados do Brasil, com equipe própria em cada unidade, e segue em expansão. Fale com a gente pra confirmar sua região.",
      },
      {
        question: "Como sei se meu restaurante está pronto pra ser cliente?",
        answer:
          "Como nosso trabalho é seletivo, o primeiro passo é conversar com nosso time. Preencha o formulário abaixo e agendamos um diagnóstico.",
      },
    ],
  },

  ctaFinal: {
    ghost: "ALPHA",
    eyebrow: "Vamos conversar?",
    title: "Seu restaurante não precisa de mais um post bonito. Precisa de mesas cheias.",
    text: "Fale com o time da Alpha e descubra se o seu restaurante está pronto pra virar o próximo case.",
    cta: { label: "Quero conversar", href: "/#contato" },
  },

  footer: {
    about:
      "A maior assessoria de marketing especializada em restaurantes da América Latina. Estrutura 100% presencial, resultado real.",
    location: "Brasília, DF, atendimento em todo o Brasil",
    // null = oculto até os links serem confirmados (no WP estão com "#").
    socials: [
      { label: "Instagram", href: null as string | null },
      { label: "TikTok", href: null as string | null },
      { label: "YouTube", href: null as string | null },
    ],
    columns: [
      {
        title: "Navegação",
        links: [
          { label: "Nossa história", href: "/#historia" },
          { label: "Liderança", href: "/#equipe" },
          { label: "Metodologia", href: "/#metodologia" },
        ] satisfies NavLink[],
      },
      {
        title: "Explorar",
        links: [
          { label: "Blog", href: wp.blog, external: true },
          { label: "Alpha's Pizzaria", href: wp.pizzaria, external: true },
          { label: "Presença nacional", href: "/#mapa" },
          { label: "Perguntas frequentes", href: "/#faq" },
        ] satisfies NavLink[],
      },
    ],
    cta: {
      title: "Pronto pra crescer?",
      text: "Fale com um especialista da Alpha e descubra se o seu restaurante está pronto.",
      label: "Fale com a gente",
      href: "/#contato",
    },
    copyright: "2026 © Alpha Assessoria. Todos os direitos reservados.",
    tagline: "Marketing gastronômico · América Latina",
  },

  obrigado: {
    title: "Recebemos seus dados!",
    text: "Nosso time entra em contato em breve.",
    back: "Voltar para o início",
  },
};

export type Content = typeof content;
