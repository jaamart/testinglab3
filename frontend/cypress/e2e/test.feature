Feature: Lägg till kund i databasen

Det ska finnas ett tomt formulär där värdena är noll. När man fyllt i
information och klickar på submit ska informationen läggas till i databasen och
man ska få en bekräftelse på vad som blivit inlagt.

Scenario: Skriv något
  Given Jag är på hemsidan och formuläret är tomt
  When Jag skriver in något i namn-fältet
  Then Värdet ska stå i namn-fältet

Scenario: Lägg till en ny kund
  Given Jag är på hemsidan och redo att fylla i formuläret
  When Jag fyller i formuläret och klickar på submit
  Then Värdena läggs till i databasen och backendet skickar samma information som lagts in i formuläret och visar det på sidan

Scenario: Välj en kund från listan
  Given Sidan har laddat in en lista med kunder och visar den till vänster
  When Jag klickar på en av dem
  Then Sidan visar information om rätt kund
