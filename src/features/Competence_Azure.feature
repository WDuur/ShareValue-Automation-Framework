@regression
Feature: Wat we doen page

    Background: Pre condition
        Given I navigate to the "azure" competence page
    @dev
    Scenario: The is a Hero on this page about Azure
        Then I see a default hero image on the page as a hero
        And The hero has a title "Microsoft Azure"

    Scenario: On the what we do azure page there is a introduction text
        Then I should see an introduction paragraph
        And That paragraph has a image for the intro

    Scenario Outline: On the page there are alternating content blocks
        Then I see "3" "contentblok" segments on the page
        And A content blok has a heading "<title>"
        And This contentblok with heading "<title>" has an image
        And This contentblok with heading "<title>" has an paragraph
        And This contentblok has a button with text "<label>"

        Examples:
            | title                                  | label                                |
            | Azure Security: veiligheid in de cloud | Neem contact op voor meer informatie |
            | Azure Kubernetes Service (AKS)         |                                      |
            | Infrastructure as Code (IaC)           |                                      |

    Scenario: On the page there is a single call to action
        Then I see the "singlecta" segment on the page
        And The "singlecta" wil have "1" call to actions
        Then I can click on the "Lees de klantcase over ons werk bij Stichting Inlichtingenbureau" button


    Scenario: For the Azure competence there are Azure profesionals
# Then I see the "person" segment on the page
