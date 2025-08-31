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
    @dev
    Scenario Outline: On the page there are alternating content blocks
        Then I see "4" "contentblok" segments on the page

        And A content blok has a heading "<title>"
        And This contentblok with heading "<title>" has an image
        And This contentblok with heading "<title>" has an paragraph
        And This contentblok has a button with text "<label>" and link to "<link>"

        Examples:
            | title                           | label                                 | link                         |
            | De Microsoft 365 Copilot-straat | Naar de Microsoft 365 Copilot-straat  | microsoft-365-copilot-straat |
            | NIS2-Modules                    | Lees meer over de NIS2-Modules        | nis2-modules                 |
            | De ShareValue Migratiestraat    | Naar de ShareValue Migratiestraat     | migratiestraat               |
            | De ShareValue Adoptiestraat     | Lees hier alles over de Adoptiestraat | adoptiestraat                |