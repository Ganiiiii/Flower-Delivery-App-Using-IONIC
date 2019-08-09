import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicService } from 'src/app/shared/servic.service';
import { Route } from '@angular/compiler/src/core';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  items = [
    {
      img:'Alstroemeria_aurantiaca.jpg',
      name:'Alstroemeria',
      des:'Alstroemeria, commonly called the Peruvian lily or lily of the Incas, is a genus of flowering plants in the family Alstroemeriaceae. They are all native to South America although some have become naturalized in the United States, Mexico, Australia, New Zealand, Madeira and the Canary Islands.'
    },
    {
      img:'5410-dark-pink-amaryllis.jpg',
      name:'Amaryllis',
      des:'The amaryllis is a popular bulb plant with large lily-like blooms and long, thick stems. Its fragrant flowers can be found in several colors. It is also known as the belladonna lily.'
    },
    {
      img:'Moondust-carnation.jpeg',
      name:'Carnation',
      des:'A long-lasting flower available in a wide variety of colors. Also known as dianthus, carnations have a long history of cultivation and are traditionally associated with fascination and distinction.A brightly colored flower distinguished by its large blooming heads consisting of densely layered petals with a fuzzy texture. Celosia is also commonly known as cockscomb.'
    },
    {
      img:'Delphinium.jpg',
      name:'Delphinium',
      des:'Named after the dolphin for the long pointy shape of the bloom’s base, this field flower comes in shades of blue, white, purple, and sometimes pink. It is related to the Larkspur and used to symbolize levity and light-heartedness.'
    },
    {
      img:'Iris.jpg',
      name:'Iris',
      des:'Six-petaled flower predominantly found in shades of blue or purple. Yellow and white are also available. Iris are grown in many parts of the world and generally symbolize faith and wisdom.'
    },
    {
      img:'black_roses.jpeg',
      name:'Roses',
      des:'Long considered a symbol of beauty and love, roses figure into many myths and fairy tales. Romantic writers and poets have used the flower as a metaphor for emotion, beauty, passion and true love.'
    },
    {
      img:'tulip.jpg',
      name:'Tulip',
      des:'Although tulips are most often associated with the Netherlands, this flower is actually a native of Persia. Representing "consuming love" and "happy years," the tulip can be a meaningful wedding choice.'
    },
    {
      img:'calla_lillies.jpeg',
      name:'Calla Lillies',
      des:'Also known as the arum lily, this elegant, trumpet-shaped blossom originated in Africa and symbolizes "magnificent beauty" in the language of flowers. '
    },
    {
      img:'peony.jpeg',
      name:'Peony',
      des:'Prized for its delicacy and impressive beauty, the peony has a voluminous strong perfume and bright color. But despite its outward showiness, the flower acquired the Victorian meaning of "bashfulness."'
    },
    {
      img:'sweet-peas.jpeg',
      name:'Sweet Peas',
      des:'The sweet pea, which signifies "lasting pleasure," was first brought to England from Sicily in 1699, and the English have had a love affair with this delicate flower ever since.'
    },
    {
      img:'stephanotis.jpeg',
      name:'Stephanotis',
      des:'The Victorian meaning for this flower is "marital happiness," making the dainty white Stephanotis an obvious choice for weddings. The star-shape, waxy florets actually grow on a flowering vine—each vine must be individually wired or placed onto a special holder before it can be arranged.'
    }
  ]

  constructor(private active: ActivatedRoute, private router:Router,private serve:ServicService) {

   }

  ngOnInit()
  {
  }

  select(flower)
  {
    this.serve.flower(flower);
    this.router.navigate(['../../send',flower.name], {relativeTo: this.active});
  } 
  startClicked()
  {
    HomePage.count();
  }
}
