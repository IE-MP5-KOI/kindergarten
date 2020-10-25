// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL
;(function ($) {
  $(function () {
    // provide crossword entries in an array of objects like the following example
    // Position refers to the numerical order of an entry. Each position can have
    // two entries: an across entry and a down entry
    var puzzleData = [
      {
        clue: 'First letter of greek alphabet',
        answer: 'alpha',
        position: 1,
        orientation: 'across',
        startx: 1,
        starty: 2
      },
      {
        clue: 'Not a one ___ motor, but a three ___ motor',
        answer: 'phase',
        position: 3,
        orientation: 'across',
        startx: 7,
        starty: 1
      },
      {
        clue: 'Created from a separation of charge',
        answer: 'capacitance',
        position: 5,
        orientation: 'across',
        startx: 1,
        starty: 3
      },
      {
        clue: 'The speeds of engines without and accelaration',
        answer: 'idlespeeds',
        position: 8,
        orientation: 'across',
        startx: 1,
        starty: 5
      },
      {
        clue: 'Complex resistances',
        answer: 'impedances',
        position: 10,
        orientation: 'across',
        startx: 2,
        starty: 7
      },
      {
        clue: 'This device is used to step-up, step-down, and/or isolate',
        answer: 'transformer',
        position: 13,
        orientation: 'across',
        startx: 1,
        starty: 9
      },
      {
        clue: 'Type of ray emitted frm the sun',
        answer: 'gamma',
        position: 16,
        orientation: 'across',
        startx: 1,
        starty: 11
      },
      {
        clue: 'C programming language operator',
        answer: 'cysan',
        position: 17,
        orientation: 'across',
        startx: 7,
        starty: 11
      },
      {
        clue: 'Defines the alpha-numeric characters that are typically associated with text used in programming',
        answer: 'ascii',
        position: 1,
        orientation: 'down',
        startx: 1,
        starty: 1
      },
      {
        clue: 'Generally, if you go over 1kV per cm this happens',
        answer: 'arc',
        position: 2,
        orientation: 'down',
        startx: 5,
        starty: 1
      },
      {
        clue: 'Control system strategy that tries to replicate the human through process (abbr.)',
        answer: 'ann',
        position: 4,
        orientation: 'down',
        startx: 9,
        starty: 1
      },
      {
        clue: 'Greek variable that usually describes rotor positon',
        answer: 'theta',
        position: 6,
        orientation: 'down',
        startx: 7,
        starty: 3
      },
      {
        clue: 'Electromagnetic (abbr.)',
        answer: 'em',
        position: 7,
        orientation: 'down',
        startx: 11,
        starty: 3
      },
      {
        clue: 'No. 13 across does this to a voltage',
        answer: 'steps',
        position: 9,
        orientation: 'down',
        startx: 5,
        starty: 5
      },
      {
        clue: 'Emits a lout wailing sound',
        answer: 'siren',
        position: 11,
        orientation: 'down',
        startx: 11,
        starty: 7
      },
      {
        clue: 'Information technology (abbr.)',
        answer: 'it',
        position: 12,
        orientation: 'down',
        startx: 1,
        starty: 8
      },
      {
        clue: 'Asynchronous transfer mode (abbr.)',
        answer: 'atm',
        position: 14,
        orientation: 'down',
        startx: 3,
        starty: 9
      },
      {
        clue: 'Offset current control (abbr.)',
        answer: 'occ',
        position: 15,
        orientation: 'down',
        startx: 7,
        starty: 9
      }
    ]

    var easy = [
      {
        clue: '',
        answer: 'blue',
        position: 1,
        orientation: 'across',
        startx: 1,
        starty: 2
      },
      {
        clue: '1. What color is the ocean',
        answer: 'blue',
        position: 1,
        orientation: 'across',
        startx: 1,
        starty: 2
      },
      {
        clue: '2. Lipstick is this color',
        answer: 'red',
        position: 2,
        orientation: 'down',
        startx: 4,
        starty: 1
      }
    ]

    var medium = [
      {
        clue: '',
        answer: 'potato',
        position: 1,
        orientation: 'across',
        startx: 1,
        starty: 1
      },
      {
        clue: '1. These are a type of starchy food, mashed or fried they can be found. And they are grown underground.',
        answer: 'potato',
        position: 1,
        orientation: 'across',
        startx: 1,
        starty: 1
      },
      {
        clue: '2. Round, yellow, sweet, Her home is a garden bed',
        answer: 'turnip',
        position: 2,
        orientation: 'down',
        startx: 3,
        starty: 1
      },
      {
        clue: `3. I have many layers but I’m not someone wearing winter clothes
        I can be red, white or yellow but I’m not a rose
        I can be made into rings but I’m not gold
        I can be peeled but I’m not a banana
        I’m a bulb but I don’t shine
        I can make you cry but I’m not a sad movie`,
        answer: 'onion',
        position: 3,
        orientation: 'down',
        startx: 6,
        starty: 1
      }
    ]

    var hard = [
      {
        clue: ``,
        answer: 'elephant',
        position: 1,
        orientation: 'across',
        startx: 1,
        starty: 1
      },
      {
        clue: `1. I’m gray but I’m not a cloud
        I have a tail but I’m not a cat
        I have big ears but I’m not a bunny
        I’m tall but I don’t play basketball
        I’m jumbo but I’m not a jet
        I have a trunk but I’m not a car`,
        answer: 'elephant',
        position: 1,
        orientation: 'across',
        startx: 1,
        starty: 1
      },
      {
        clue: `4. What has four legs, breathes, but doesn't move`,
        answer: 'koala',
        position: 4,
        orientation: 'across',
        startx: 2,
        starty: 5
      },
      {
        clue: `6. Swinging through the jungle’s trees is something at which I’m great. I like to eat bananas and I’m a type of primate`,
        answer: 'monkey',
        position: 6,
        orientation: 'across',
        startx: 2,
        starty: 7
      },

      {
        clue: `2. Black eye, black ears, black fleece, white vest`,
        answer: 'panda',
        position: 2,
        orientation: 'down',
        startx: 4,
        starty: 1
      },
      {
        clue: `3. Armored but not a knight, snapping but not a twig, and always at home, even on the move`,
        answer: 'turtle',
        position: 3,
        orientation: 'down',
        startx: 8,
        starty: 1
      },
      {
        clue: `5. I can sizzle like bacon, I am made with an egg, I have plenty of backbone, but lack a good leg, I peel layers like onions, but still remain whole, I can be long, like a flagpole, yet fit in a hole`,
        answer: 'snake',
        position: 5,
        orientation: 'down',
        startx: 6,
        starty: 3
      },
      {
        clue: `7. The second-largest living bird by height in the world`,
        answer: 'emu',
        position: 7,
        orientation: 'down',
        startx: 2,
        starty: 6
      }
    ]

    window.onload = function () {
      $('#puzzle-wrapper').crossword(JSON.parse(JSON.stringify(easy)))
    }
  })
})(jQuery)
