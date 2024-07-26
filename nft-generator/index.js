const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createCanvas, loadImage } = require('canvas');

const WIDTH = 1024;
const HEIGHT = 1024;
const TRAITS_DIR = './layers/trait_types';
const OUTPUT_DIR = './outputs';
const METADATA_DIR = path.join(OUTPUT_DIR, 'metadata');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');

function deleteDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const curPath = path.join(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteDirectory(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dir);
  }
}

console.log('Cleaning up old output...');
deleteDirectory(OUTPUT_DIR);

console.log('Creating new output directories...');
[OUTPUT_DIR, METADATA_DIR, IMAGES_DIR].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

const traitProbabilities = {
  punks: {
    probability: 1,
    values: {
      'zombie.png': 0.0088,
      'ape.png': 0.0024,
      'female.png': 0.384,
      'male.png': 0.6039,
      'alien.png': 0.0009
    }
  },
  top: {
    probability: 0.3840, // This is the original probability for 'top' from your earlier data
    values: {
      'beanie.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'bob.png': { probability: 1, allowedBases: ['female.png'] },
      'cap_forward.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'cap.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'choker.png': { probability: 1, allowedBases: ['female.png'] },
      'clown_hair.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'cowboy_hat.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'crazy_hair.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'do-rag.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'fedora.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'frumpy_hair.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'half_shaved.png': { probability: 1, allowedBases: ['female.png'] },
      'headband.png': { probability: 1, allowedBases: ['male.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'hoodie.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'knitted_cap.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'long_hair_parted.png': { probability: 1, allowedBases: ['female.png'] },
      'mohawk.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'peak_spike.png': { probability: 1, allowedBases: ['female.png'] },
      'pigtails.png': { probability: 1, allowedBases: ['female.png'] },
      'pilot_helmet.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'police_cap.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'mohawk.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'short.png': { probability: 1, allowedBases: ['female.png'] },
      'spikey_hair.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'straight_hair.png': { probability: 1, allowedBases: ['female.png'] },
      'tassle_hat.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'tiara.png': { probability: 1, allowedBases: ['female.png'] },
      'top_hat.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'vampire_hair.png': { probability: 1, allowedBases: ['male.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'welding_goggles.png': { probability: 1, allowedBases: ['male.png', 'female.png', 'zombie.png', 'ape.png', 'alien.png'] },
      'wild_hair_with_bangs.png': { probability: 1, allowedBases: ['female.png'] },
      'wild_hair.png': { probability: 1, allowedBases: ['female.png'] },
    }
  },
  beard: {
    probability: 0.0286,
    values: {
      'big_beard.png': { probability: 0.5, allowedBases: ['male.png', 'zombie.png', 'alien.png'] },
      'chinstrap.png': { probability: 0.5, allowedBases: ['male.png', 'zombie.png', 'alien.png'] },
      'front_beard_dark.png': { probability: 0.5, allowedBases: ['male.png', 'zombie.png', 'alien.png'] },
      'front_beard.png': { probability: 0.5, allowedBases: ['male.png', 'zombie.png', 'alien.png'] },
      'goat.png': { probability: 0.5, allowedBases: ['male.png', 'zombie.png', 'alien.png'] },
      'luxurious_beard.png': { probability: 0.5, allowedBases: ['male.png', 'zombie.png', 'alien.png'] },
      'mustache.png': { probability: 0.5, allowedBases: ['male.png', 'zombie.png', 'alien.png'] },
      'muttonchops.png': { probability: 0.5, allowedBases: ['male.png', 'zombie.png', 'alien.png']},
      'normal_beard.png': { probability: 0.5, allowedBases: ['male.png', 'zombie.png', 'alien.png'] },
    }
  },
  cheek: {
    probability: 0.0286,
    values: {} // Add values if needed
  },
  glasses: {
    probability: 0.0572,
    values: {
      'small_shades.png': 0.5,
      'eye_mask.png': 0.3,
      '3D_glasses.png': 0.1,
      'vr.png': 0.1
    }
  },
  mouth: {
    probability: 1,
    values: {
      'buck_teeth.png': 0.2,
      'medical_mask.png': 0.15,
      'pipe.png': 0.4,
      'cigarette.png': 0.2,
      'vape.png': 0.05
    }
  }
};

const traitCounts = Object.fromEntries(Object.keys(traitProbabilities).map(trait => [trait, 0]));
const traitValueCounts = {};

function getRandomFile(trait, dir, baseType) {
  const traitValues = traitProbabilities[trait].values;
  if (Object.keys(traitValues).length === 0) {
    const files = fs.readdirSync(dir).filter(file => !file.startsWith('.'));
    return files.length > 0 ? files[Math.floor(Math.random() * files.length)] : null;
  } else {
    const rand = Math.random();
    let cumulativeProbability = 0;
    const eligibleValues = Object.entries(traitValues).filter(([_, value]) => 
      !value.allowedBases || value.allowedBases.includes(baseType)
    );
    
    if (eligibleValues.length === 0) {
      return null; // No eligible values, return null
    }

    // Normalize probabilities for eligible values
    const totalProbability = eligibleValues.reduce((sum, [_, value]) => sum + (value.probability || value), 0);
    
    for (const [file, value] of eligibleValues) {
      const normalizedProbability = (value.probability || value) / totalProbability;
      cumulativeProbability += normalizedProbability;
      if (rand < cumulativeProbability) {
        return file;
      }
    }
    return eligibleValues[eligibleValues.length - 1][0];
  }
}

function hashTraits(traits) {
  const traitsString = JSON.stringify(traits);
  return crypto.createHash('md5').update(traitsString).digest('hex');
}

const generatedHashes = new Set();

async function generateUniqueNFT(tokenId) {
  let traits;
  let traitHash;
  let attempts = 0;
  const maxAttempts = 50000;

  do {
    attempts++;
    traits = {};
    // First, select the base punk type
    const punkType = getRandomFile('punks', path.join(TRAITS_DIR, 'punks'));
    traits['punks'] = punkType;

    // Then select other traits based on the punk type
    for (const [trait, { probability }] of Object.entries(traitProbabilities)) {
      if (trait !== 'punks' && Math.random() < probability) {
        const traitDir = path.join(TRAITS_DIR, trait);
        const traitFile = getRandomFile(trait, traitDir, punkType);
        if (traitFile) {
          traits[trait] = traitFile;
        }
      }
    }
    traitHash = hashTraits(traits);

    if (attempts >= maxAttempts) {
      throw new Error(`Failed to generate a unique NFT after ${maxAttempts} attempts`);
    }
  } while (generatedHashes.has(traitHash));

  generatedHashes.add(traitHash);
  
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Disable image smoothing
  ctx.imageSmoothingEnabled = false;

  // Draw background
  const background = await loadImage('./layers/background/background.png');
  ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);

  // Draw traits in specific order
  const drawOrder = ['punks', 'top', 'beard', 'cheek', 'glasses', 'mouth'];
  for (const trait of drawOrder) {
    if (traits[trait]) {
      const traitImage = await loadImage(path.join(TRAITS_DIR, trait, traits[trait]));
      ctx.drawImage(traitImage, 0, 0, WIDTH, HEIGHT);

      traitCounts[trait]++;
      traitValueCounts[trait] = traitValueCounts[trait] || {};
      traitValueCounts[trait][traits[trait]] = (traitValueCounts[trait][traits[trait]] || 0) + 1;
    }
  }

  // Convert to black and white
  const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = avg;
  }
  ctx.putImageData(imageData, 0, 0);

  // Save image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(IMAGES_DIR, `${tokenId}.png`), buffer);

  // Generate metadata
  const metadata = {
    name: `Color Punk #${tokenId}`,
    description: "Punks you can customize with your Base Colors",
    image: `${tokenId}.png`,
    attributes: Object.entries(traits).map(([trait, value]) => ({
      trait_type: trait,
      value: path.parse(value).name
    }))
  };

  fs.writeFileSync(path.join(METADATA_DIR, `${tokenId}.json`), JSON.stringify(metadata, null, 2));
}

async function generateNFTs(count) {
  console.log(`Starting generation of ${count} unique NFTs...`);
  
  for (let i = 0; i < count; i++) {
    await generateUniqueNFT(i);
    console.log(`Progress: ${i + 1}/${count} (${((i + 1) / count * 100).toFixed(2)}%)`);
  }

  console.log('\nGeneration complete. Calculating trait statistics...');

  // Log actual percentages
  console.log('\nActual trait percentages:');
  for (const [trait, totalCount] of Object.entries(traitCounts)) {
    const percentage = (totalCount / count) * 100;
    console.log(`${trait}: ${percentage.toFixed(2)}%`);

    console.log('  Trait value percentages:');
    for (const [value, valueCount] of Object.entries(traitValueCounts[trait] || {})) {
      const valuePercentage = (valueCount / totalCount) * 100;
      console.log(`    ${value}: ${valuePercentage.toFixed(2)}%`);
    }
  }
  
  console.log('\nNFT generation process completed.');
}

const count = parseInt(process.argv[2]);

if (isNaN(count) || count <= 0) {
  console.error('Please provide a valid positive number of NFTs to generate.');
  process.exit(1);
}

generateNFTs(count);