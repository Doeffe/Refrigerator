using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RefrigeratorAPI.Models
{
    public class EntityUtilities
    {
        // unit types
        public enum UnitType
        {
            ml,
            cl,
            dl,
            l,
            stk,
            pk,
            gr,
            kg,
        }

        // categories
        public enum EntityCategory
        {
            Dairy,
            Butcher,
            FruitVegetables,
            OtherFoods,
            CleaningProducts,
            OtherHouseholds,
            PersonalCare,
            ResidentialGarden,
        }
    }
}