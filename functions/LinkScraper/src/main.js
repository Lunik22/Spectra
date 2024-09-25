import { Client } from 'node-appwrite';
import puppeteer from 'puppeteer';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  
  //Define source specifications
  const pathSme = {link: 'https://www.sme.sk/', mainDomain: 'sme.sk', subdomain: ['najnovsie'], class: '.left-panel', exclude: ['/aut/', '/najnovsie', 'https://sportnet.sme.sk/?ref=author_mig', '/diskusie/']};
  const pathDennikn = {link: 'https://dennikn.sk/', mainDomain: 'dennikn.sk', subdomain: ['najnovsie'], class: '.n3_tiles', exclude: ['/autor/', '/#diskusia']};
  const pathAktuality = {link: 'https://www.aktuality.sk/', mainDomain: 'aktuality.sk', subdomain: ['nazivo'], class: '.timeline-wrapper', exclude: ['/nazivo/']};
  const pathTvnoviny = {link: 'https://www.tvnoviny.sk/', mainDomain: 'tvnoviny.sk', subdomain: ['prehlad-dna'], class: '.col-lg-8', exclude: ['/autor/']};
  const pathJojNoviny = {link:'https://www.noviny.sk/', mainDomain: 'noviny.sk', subdomain: ['slovensko', 'zahranicie', 'krimi', 'politika', 'ekonomika'], class: '.c-article-wrapper', exclude: ['/a/']};
  const pathJojTopstar = {link:'https://topstar.noviny.sk/', mainDomain: 'noviny.sk', subdomain: ['showbiznis', 'hudba', 'kralovska-rodina'], class: '.c-article-wrapper', exclude: ['/a/']};
  const pathJojPreZenu = {link:'https://prezenu.noviny.sk/', mainDomain: 'noviny.sk', subdomain: ['top-trendy', 'relax-a-zdravie', 'rodina-a-deti', 'laska-a-sex', 'krasa-a-vlasy'], class: '.c-article-wrapper', exclude: ['/a/']};
  const pathJojSportNoviny = {link:'https://sport.noviny.sk/', mainDomain: 'noviny.sk', subdomain: ['futbal', 'hokej', 'cyklistika', 'tenis', 'halove-sporty', 'bojove-sporty', 'motorizmus', 'ostatne-sporty'], class: '.c-article-wrapper', exclude: ['/a/']};
  const pathJojSmeChlapi = {link:'https://smechlapi.noviny.sk/', mainDomain: 'noviny.sk', subdomain: ['moto', 'lifestyle', 'chill', 'video'], class: '.c-article-wrapper', exclude: ['/a/']};
  const pathSpravyRtvs = {link:'https://spravy.rtvs.sk/kategoria/', mainDomain: 'rtvs.sk', subdomain: ['slovensko', 'svet', 'ekonomika', 'regiony', 'sport', 'radiozurnal'], class: '.articles-list', exclude: ['/kategoria/', '/tag/']};
  const pathPravda = {link:'https://www.pravda.sk/', mainDomain: 'pravda.sk', subdomain: ['bleskove-spravy'], class: '.bleskovo-box-day', exclude: ['/a/']};
  const pathHospodarskeNoviny = {link:'https://www.hnonline.sk/', mainDomain: 'hnonline.sk', subdomain: ['hn24'], class: '.grid .grid--middle', exclude: ['/hn24?page=2']};
  const pathTeraz = {link:'https://www.teraz.sk/', mainDomain: 'teraz.sk', subdomain: ['sport', 'pocasie', 'publicistika', 'slovensko', 'zahranicie', 'ekonomika', 'regiony', 'kultura', 'veda', 'krimi', 'utulkovo', 'magazin'], class: '.mediaListing', exclude: ['/a/']};
  const pathSita = {link:'https://sita.sk/kategoria/', mainDomain: 'sita.sk', subdomain: ['spravy', 'ekonomika', 'sport'], class: '.timeline', exclude: ['/page/']};
  const pathEreport = {link:'https://ereport.sk/', mainDomain: 'ereport.sk', subdomain: ['politika', 'spravy', 'rozhovory', 'celebrity', 'sport', 'ereport_trnava'], class: '.row', exclude: ['/domaca-politika/', '/zahranicna-politika/', '/spravy-z-domova/', '/spravy-zo-zahranicia/', '/krimi-spravy/', '/slovenske-celebrity/', '/svetove-celebrity/', '/futbal/', '/hokej/', '/tenis/', '/lyzovanie/', '/sport/', '/ereport_trnava/', 'zaujima-nas-co-vas-zaujima', '/spravodajstvo/', '/doprava/', '/kultura/', '/sport-ereport_trnava/', '/komentar/', '/maly-rim/']};
  const pathRefresher = {link:'https://refresher.sk/', mainDomain: 'refresher.sk', subdomain: ['lifestyle-news', 'zaujimavosti', 'filmy-a-serialy', 'moda', 'refresher', 'refresher/rozhovory', 'zdravie', 'hudba', 'tech', 'kultura', 'gastro', 'kvizy'], class: '.article-list', exclude: ['/a/']};
  const pathRefresherNews = {link:'https://news.refresher.sk/', mainDomain: 'refresher.sk', subdomain: [''], class: '.hp-latest-articles__feed', exclude: ['/a/']};
  const pathNovyCas = {link:'https://www.cas.sk/', mainDomain: 'cas.sk', subdomain: ['spravy', 'prominenti'], class: '.hp-bottom-list', exclude: ['/spravy/', '/tip-od-vas/', '/sport/', '/prominenti/']};
  const pathSportovyCas = {link:'https://sportovy.cas.sk/', mainDomain: 'cas.sk', subdomain: [''], class: '.doma-tabs', exclude: ['javascript:void']};
  //const pathPluska = {link:'https://www.pluska.sk/r/', mainDomain: 'pluska.sk', subdomain: ['spravy', 'krimi', 'soubiznis'], class: '.PageContentGenerator_column-item__h1ooE', exclude: ['']};
  const pathTopky = {link:'https://www.topky.sk/se/2/', mainDomain: 'topky.sk', subdomain: ['Spravodajstvo'], class: '.box-messages', exclude: ['/se/']};
  const pathSportky = {link:'https://sportky.zoznam.sk/', mainDomain: 'zoznam.sk', subdomain: [''], class: '#article_list', exclude: ['/s/']};
  const pathStartitup = {link:'https://www.startitup.sk/kategoria/', mainDomain: 'startitup.sk', subdomain: ['biznis-startupy', 'krimi', 'hlavne-spravy-a-aktuality', 'architektura', 'zo-slovenska', 'inovacie-eko', 'rozhovory', 'cestovanie', 'zo-sveta', 'nazory-a-komentare'], class: '.recent-articles-wrap', exclude: ['/a/']};
  const pathFontech = {link:'https://fontech.startitup.sk/category/', mainDomain: 'startitup.sk', subdomain: ['smartfony', 'hry', 'krypto', 'tech', 'zo-slovenska', 'recenzie', 'rozhovory', 'filmy-serialy', 'umela-inteligencia', 'vesmir-veda', 'elektromobilita+recenzie', 'elektromobilita+zo-slovenska', 'elektromobilita/e-kolobezky', 'elektromobilita/e-bicykle', 'elektromobilita/e-auta'], class: '.content-inner', exclude: ['/a/']};
  
  //Create an array of all the paths
  const articlePaths = [pathSme, pathDennikn, pathAktuality, pathTvnoviny, pathJojNoviny, pathJojTopstar, pathJojPreZenu, pathJojSportNoviny, pathJojSmeChlapi, pathSpravyRtvs, pathPravda, pathHospodarskeNoviny, pathTeraz, pathSita, pathEreport, pathRefresher, pathRefresherNews, pathNovyCas, pathSportovyCas, pathTopky, pathSportky, pathStartitup, pathFontech];

  //Initialize Appwrite client
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)

  //Initialize Appwrite services
  const databases = new Databases(client);

  try {
    //Array for all of the links
    let articleLinks = [];

    //Timestamp for the last update
    let timestamp = 0;

    //Launch puppeteer
    const browser = await puppeteer.launch({
        headless: true, 
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    //Create a new page
    const page = await browser.newPage();

    //Iterate through all the paths
    for (let i = 0; i < articlePaths.length; i++) {
      //Iterate through all the subdomains
      for (let j = 0; j < articlePaths[i].subdomain.length; j++) {
        //Go to the page
        await page.goto(articlePaths[i].link + articlePaths[i].subdomain[j], { waitUntil: 'domcontentloaded' });
        //Get the links
        const linksLoad = await page.evaluate((pathClass, pathExclude, pathDomain) => {
          const linkContainer = document.querySelector(pathClass);
          //Filter the links
          const links = linkContainer ? Array.from(linkContainer.querySelectorAll('a'))
              .filter(link => 
                  link.href.includes(pathDomain) &&
                  !pathExclude.some(exclude => link.href.includes(exclude))
              )
              .map(link => link.href) : [];
          return links;
        }, articlePaths[i].class, articlePaths[i].exclude, new URL(articlePaths[i].link).hostname);

        articleLinks.push(...linksLoad);
        timestamp = Date.now();
      }
    }

    //Close the browser
    await browser.close();

    //Defining the collection of the article links for the past 6 hours
    let articleLinksCollection = databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_LINKS_COLLECTION,
      [
        Query.greaterThanEqual('ArticleLinkDate', timestamp-21600)
      ]
    );

    //Iterate through all the new links
    for (let i = 0; i < articleLinks.length; i++) {
      //Checking if the link is already in the collection
      if (!articleLinksCollection.includes(articleLinks[i])) {
        //Creating a new document
        const promise = databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_LINKS_COLLECTION,
          ID.unique(),
          {
            ArticleLink: articleLinks[i],
            ArticleLinkDate: timestamp
          }
        );

        //Logging the response
        promise.then(function (response) {
          console.log(response);
        }, function (error) {
            console.log(error);
        });
      }
    }
  } catch(err) {
    error("Could not list users: " + err.message);
  }

  // The req object contains the request data
  if (req.path === "/ping") {
    // Use res object to respond with text(), json(), or binary()
    // Don't forget to return a response!
    return res.text("Pong");
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};
