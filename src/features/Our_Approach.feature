@regression
Feature: Wat we doen page

    Background: Pre condition
        Given I navigate to the our approach page

    Scenario: The is a Hero on this page
        Then I see a hero image on the page as a hero
        And The hero has a title "Wat we doen"

    Scenario: On the page there is a introduction text
        Then I should see a header with the text "Onze aanpak"
        And I should see a paragraph containing the description about the "intro"
        Then There is an image with the "intro"

    Scenario Outline: On the page there are alternating content blocks
        Then I see "4" "contentblok" segments on the page

        And A content blok has a heading "<title>"
        And This contentblok with heading "<title>" has an image
        And This contentblok with heading "<title>" has an paragraph
        And This contentblok has a button with text "<label>"

        Examples:
            | title                           | label                                 |
            | De Microsoft 365 Copilot-straat | Naar de Microsoft 365 Copilot-straat  |
            | NIS2-Modules                    | Lees meer over de NIS2-Modules        |
            | De ShareValue Migratiestraat    | Naar de ShareValue Migratiestraat     |
            | De ShareValue Adoptiestraat     | Lees hier alles over de Adoptiestraat |
    @dev
    Scenario: On the page there is a single call to action
        Then I see the "singlecta" segment on the page
        And The "singlecta" wil have "1" call to actions
        Then I can click on the "Neem contact met ons op" button

    Scenario: On our approach there is a contact persons carousel
        Then I see the "person" segment on the page
        Then The "person" contact segment has a title "Heb je vragen?"
        Then On the "person" segment there is contact with the name "Ricardo Sinke"
        And This "person" has a function title "Manager Corporate Accounts"
        And The "person" contact card has an image for "Ricardo Sinke"
