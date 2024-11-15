'use server'

export default async function MenuInfoFiller(menuData: any) {
    try {
      // Helper function to recursively find objects with the "name" key
      const findNameObjects = (obj: any, result: any[] = []) => {
        if (typeof obj === 'object' && obj !== null) {
          if ('name' in obj) {
            result.push(obj); // Collect the object containing the "name" key
          }
          Object.values(obj).forEach((value) => findNameObjects(value, result));
        }
        return result;
      };
  
      // Helper function to fetch data for a given name
      const fetchDataForName = async (name: string) => {
        try {
          // We are simulating an external API call  
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/menuItemInfo?name=${encodeURIComponent(name)}`
          );
          if (!response.ok) throw new Error(`Failed to fetch for name: ${name}`);
          return await response.json();
        } catch (error) {
          console.error(error);
          return null; // Return null if there's an error
        }
      };
  
      // Find all "name" objects in the menu data
      const nameObjects = findNameObjects(menuData);
  
      // Fetch data for each "name" and merge it with the original objects
      const fetchPromises = nameObjects.map(async (nameObj) => {
        const apiData = await fetchDataForName(nameObj.name);
        if (apiData) {
          Object.assign(nameObj, apiData); // Merge API response with the original object
        }
      });
  
      // Wait for all fetch operations to complete
      await Promise.all(fetchPromises);
  
      return menuData; // Return the modified menu data
    } catch (err) {
      throw err;
    }
  }