COMMANDS.mouse = {
    run: () => {
        var amouse = ["This mouse is still alive", "This mouse is biting the national defense fiber optic cable", "This mouse is very lonely", "This mouse is wandering", "We gave this mouse a nickname - adventurer", "This mouse can replace the mouse", "No one knows who will come first tomorrow, accidents or him", "This mouse fell to death on earth", "Does he still remember fish?", "Does he still remember his original intention?", "His determination shattered", "123456 has never been a good password", "He, like humans, makes mistakes", "God does not bleed", "Interesting", "He still needs to face reality", "<MrZhang365> go die", "What is the meaning of being alive", "He committed suicide"]
        pushMessage("     _   _");
        pushMessage("    (q\\_/p)");
        pushMessage(".-.  |. .|");
        pushMessage("   \\ =\\,/=");
        pushMessage("    )/ _ \\  |\\");
        pushMessage("   (/\\):(/\\  )\\");
        pushMessage("    \\_   _/ |Oo\\");
        pushMessage("    `\"\"^\"\"` `\"\"\"`");
        pushMessage("");
        pushMessage(`\x1B[3m${getRandomItemFromArray(amouse)}\x1B[0m`, true, true)
    },
    help: 'A lonely mouse',
    moreHelp: 'When you execute this command, you will see a lonely mouse, mouse@XChat',
    usage: ''
}
