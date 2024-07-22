const https = require('https');
require('dotenv').config();

const fetchPinnedFiles = (offset = 0) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'storage.thirdweb.com',
      path: `/ipfs/pinned?limit=50&offset=${offset}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.THIRDWEB_SECRET}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
};

const deletePinnedFile = (ipfsHash) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'storage.thirdweb.com',
      path: `/ipfs/pinned/${ipfsHash}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.THIRDWEB_SECRET}`
      }
    };

    const req = https.request(options, (res) => {
      res.on('data', (chunk) => {
        // Do nothing with the response data
      });

      res.on('end', () => {
        resolve();
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
};

const main = async (maxHashes) => {
  let offset = 0;
  let allHashes = [];
  let hasMore = true;

  while (hasMore && allHashes.length < maxHashes) {
    const response = await fetchPinnedFiles(offset);
    const pinnedFiles = response.result.pinnedFiles;

    if (pinnedFiles.length > 0) {
      const hashes = pinnedFiles.map(file => file.ipfsHash);
      allHashes = allHashes.concat(hashes);
      offset += pinnedFiles.length;
      console.log(`Fetched ${offset} files so far...`);
    } else {
      hasMore = false;
    }
  }

  if (allHashes.length > maxHashes) {
    allHashes = allHashes.slice(0, maxHashes);
  }

  for (let i = 0; i < allHashes.length; i++) {
    const hash = allHashes[i];
    deletePinnedFile(hash);
    console.log(`Deleted IPFS hash: ${hash}`);
    console.log(`Deleted ${i + 1} of ${allHashes.length} hashes`);
  }

  console.log('All specified IPFS hashes have been deleted.');
};

const maxHashes = parseInt(process.argv[2], 10);
if (isNaN(maxHashes) || maxHashes <= 0) {
  console.error('Please provide a valid maximum number of IPFS hashes to delete.');
  process.exit(1);
}

main(maxHashes).catch(console.error);
