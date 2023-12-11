Feature: Lägg till kund i databasen

Det ska finnas ett tomt formulär där värdena är noll. När man fyllt i
information och klickar på submit ska informationen läggas till i databasen och
man ska få en bekräftelse på vad som blivit inlagt.

Scenario: Skriv något
  Given Jag är på hemsidan och formuläret är tomt
  When Jag skriver in något i namn-fältet
  Then Värdet ska stå i namn-fältet
