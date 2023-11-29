Detta är min inlämning för Labb 2 på kursen Native JavaScript hos IT-Högskolan i Göteborg.
Webbsidan är en Pokédex som jag skapat med HTML, CSS och JavaScript. Jag har också använt mig av PokéAPI.

Webbplatsen är INTE skapat för skrivbords- eller dator-layout, utan endast för smalare enheter som t.ex en mobiltelefon.
Detta innebär därför också att webbplatsen inte är responsiv.
Detta var något jag påbörjade men snabbt kompromissade bort för att säkerställa att jag skulle ha tid att slutföra projektet.
Jag hade därför uppskattat om du minimerar ditt webbläsarfönster när du kollar igenom mitt projekt.

Förstasidan på min webbplats är startsidan för min Pokédex. Högst upp har du min header och navbar.
Här har jag med hjälp av JavaScript skapat en hamburgermeny som leder till de VG-berättigande bitarna (utan Web-Storage som jag istället bockar av på förstasidan) av Labb 2.
Denna header finns med på samtliga webbsidor.
Nedanför är min Pokédex och här visas de 151st originella Pokémon.
Dessa hämtas direkt ifrån API:et (även bakgrundsfärgen). OBS: P.g.a en bugg i mitt API som orsakade att varje länk till bilderna var trasiga så hämtade jag istället dessa direkt med en url tillsammans med ID-numret.
Här kan du även söka på en Pokémon, både via NAMN och ID.
Under tiden Pokémon laddas in och visas på webbsidan så kommer det inte gå att söka.
Sökvärdet som du skriver in sparas med hjälp av localstorage ifall du t.ex. tillfälligt går in på en Pokémon.

Klickar du på en Pokémon så laddas en ny webbsida in som visar detaljer om just den specifika Pokémon som du valt.
Webbsidan visar för tillfället namn, ID, höjd, vikt, typ, och en bio. Även färgen i bakgrunden är hämtat ifrån API:et, precis som på förgående sidan.
Sitter du vid en dator och granskar sidan så kan man här bläddra Pokémon via piltangenterna på skrivbordet. En total "oversight" av mig var att jag aldrig implementerade ett alternativ till detta på mobiltelefoner, som resten utav hemsidan är designad utefter, men detta är något jag förhoppningsvis löser i framtiden.

Klickar du istället på hamburgermenyn och väljer "Chart.js" så kommer du in på min chart.
Här hämtas samtliga Pokémontyper ifrån API:et med funktioner som jag har skapat.
Dessa Pokémontyper matas sedan in i min chart tillsammans med antalet Pokémon som har sagda Pokémontyp.

Klickar du sedan på hamburgermenyn igen och väljer "Cities" istället så kommer du till min "Cities"-tjänst där du kan visa, skapa, redigera, och radera städer ifrån Cities-API:et. Klickar du på "Fetch"-knappen så körs en fetch och samtliga städer visas på sidan.
Varje stad har egna knappar för att radera och redigera staden. Försöker du redigera ogiltiga värden så kommer inget hända.
Längst ner så kan du skapa en helt ny stad. För att skapa en stad så måste du skriva in ett namn och ett antal som bor i staden.
Antalet MÅSTE vara siffror. Försöker du skicka in något annat som inte är siffror så kommer du få ett felmeddelande.

Jag har som sagt byggt allt detta med hjälp av HTML, CSS, och JS. Jag använder JavaScript för att skapa och ändra noder i min HTML-kod och jag använder mig utav Flex samt Grid för att skapa en schysst layout av innehållet.
Jag har skapat massor av funktioner i JavaScript för att få min webbplats att utföra det jag vill att den ska utföra.

Jag hoppas att du är lika nöjd över vad jag har skapat som jag själv är!

Allt gott,
Mvh
Melker Olofsson
IT-högskolan
