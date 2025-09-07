@regression @dev
Feature: Wat we doen page

    Background: Pre condition
        Given I navigate to the our "copilot" page

    Scenario: The is a Hero on this page
        Then I see a hero image on the page as a hero
        And The hero has a title "De Microsoft 365 Copilot-straat"

    Scenario: On the our approach page there is a introduction text
        Then I should see an approach introduction paragraph
#And That paragraph has a image for the intro